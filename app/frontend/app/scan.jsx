import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScanScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-gray-800">Scan</Text>
      <Text className="text-base text-gray-400 mt-2">Coming soon</Text>
    </SafeAreaView>
  );
}
