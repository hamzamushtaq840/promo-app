import React from 'react';
import { TextInput, View } from 'react-native';

import { FONTS } from '../constants/theme';

export default function InputField({
  contaynerStyle,
  inputStyle,
  placeholder,
  keyboardType,
  icon,
  secureTextEntry,
  title,
  multiline = false,
  numberOfLines,
  onChangeText,
  value,
  inputStyles,
  propIcon,
}) {
  return (
    <View
      style={{
        width: '100%',
        height: 56,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingLeft: 20,
        justifyContent: 'center',
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        ...inputStyles,
      }}>
      {propIcon && ( // Conditionally render the custom SVG icon if propIcon is provided
        <View
          style={{
            marginRight: 10, // Adjust the margin as needed
          }}>
          {propIcon}
        </View>
      )}
      <View
        style={{
          flex: 1,
        }}>
        <TextInput
          style={{ paddingRight: 20, width: '100%', ...FONTS['400'] }}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          defaultValue={value}
          keyboardType={keyboardType}
        />
      </View>
      {icon && icon}
    </View>
  );
}
