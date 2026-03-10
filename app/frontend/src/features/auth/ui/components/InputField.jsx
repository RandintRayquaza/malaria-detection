import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * @param {{ icon: string, label: string, value: string, onChangeText: (v:string)=>void, secureTextEntry?: boolean, placeholder?: string, keyboardType?: string, autoCapitalize?: 'none'|'sentences'|'words'|'characters', autoCorrect?: boolean }} props
 */
export function InputField({
  icon,
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-4">
      {label ? <Text className="text-sm font-medium text-gray-600 mb-1.5 ml-1">{label}</Text> : null}
      <View
        className={[
          'flex-row items-center rounded-2xl px-4 py-3.5 border-2 bg-gray-50',
          focused ? 'border-primary-500 bg-white' : 'border-gray-200',
        ].join(' ')}
      >
        <Feather
          name={icon}
          size={18}
          color={focused ? '#0F82F5' : '#9CA3AF'}
          style={{ marginRight: 10 }}
        />
        <TextInput
          className="flex-1 text-base text-gray-900"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}
