import os
import zipfile
import urllib.request
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split

def download_dataset(url, download_path):
    # If the file exists but is invalid (from previous failed run), remove it
    if os.path.exists(download_path):
        try:
            with zipfile.ZipFile(download_path, 'r') as zip_ref:
                pass
            print("Dataset zip already exists and is valid.")
            return
        except zipfile.BadZipFile:
            print("Existing zip is invalid, deleting and re-downloading...")
            os.remove(download_path)

    print(f"Downloading dataset from {url}...")
    opener = urllib.request.build_opener()
    opener.addheaders = [('User-agent', 'Mozilla/5.0')]
    urllib.request.install_opener(opener)
    urllib.request.urlretrieve(url, download_path)
    print("Download complete.")

def extract_dataset(zip_path, extract_to):
    if not os.path.exists(os.path.join(extract_to, 'cell_images')):
        print("Extracting dataset...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to)
        print("Extraction complete.")
    else:
        print("Dataset already extracted.")

def load_image_paths_and_labels(data_dir):
    categories = ['Parasitized', 'Uninfected']
    file_paths = []
    labels = []
    base_path = os.path.join(data_dir, 'cell_images')
    for i, category in enumerate(categories):
        category_path = os.path.join(base_path, category)
        for filename in os.listdir(category_path):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_paths.append(os.path.join(category_path, filename))
                labels.append(i)
    return file_paths, labels

def preprocess_image(file_path, label, img_size=(128, 128)):
    img = tf.io.read_file(file_path)
    img = tf.image.decode_image(img, channels=3, expand_animations=False)
    img = tf.image.resize(img, img_size)
    img = tf.cast(img, tf.float32) / 255.0
    return img, label

def prepare_datasets(data_dir, test_size=0.2, batch_size=32):
    file_paths, labels = load_image_paths_and_labels(data_dir)
    train_files, val_files, train_labels, val_labels = train_test_split(
        file_paths, labels, test_size=test_size, random_state=42, stratify=labels
    )
    def create_tf_dataset(files, labels):
        ds = tf.data.Dataset.from_tensor_slices((files, labels))
        ds = ds.map(preprocess_image, num_parallel_calls=tf.data.AUTOTUNE)
        ds = ds.batch(batch_size).prefetch(buffer_size=tf.data.AUTOTUNE)
        return ds
    return create_tf_dataset(train_files, train_labels), create_tf_dataset(val_files, val_labels)

if __name__ == '__main__':
    # Using a reliable mirror URL for NIH Malaria dataset
    DATA_URL = 'https://data.lhncbc.nlm.nih.gov/public/Malaria/cell_images.zip'
    ZIP_PATH = 'data/malaria_images.zip'
    DATA_DIR = 'data/'
    os.makedirs(DATA_DIR, exist_ok=True)
    download_dataset(DATA_URL, ZIP_PATH)
    extract_dataset(ZIP_PATH, DATA_DIR)
    print("Dataset loader initialized successfully.")
