import React, { memo } from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { Text, TextProps } from '@ui-kitten/components';

export default memo(
  ({
    margin,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    opacity,
    uppercase,
    lowercase,
    capitalize,
    none,
    left,
    lineHeight,
    right,
    center,
    underline,
    onPress,
    italic,
    category = 'body',
    status = 'basic',
    children,
    maxWidth,
    style,
    fontWeight,
    ...rest
  }) => {
    let textAlign

    left
      ? (textAlign = 'left')
      : right
        ? (textAlign = 'right')
        : center
          ? (textAlign = 'center')
          : (textAlign = 'left');

    let textTransform

    uppercase
      ? (textTransform = 'uppercase')
      : lowercase
        ? (textTransform = 'lowercase')
        : capitalize
          ? (textTransform = 'capitalize')
          : none
            ? (textTransform = 'none')
            : (textTransform = 'none');

    let textDecorationLine
    underline ? (textDecorationLine = 'underline') : (textDecorationLine = 'none');

    let fontStyle;
    italic ? (fontStyle = 'italic') : (fontStyle = 'normal');

    return (
      <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={!onPress ? 1 : 0.54}>
        <Text
          category={category}
          status={status}
          style={[
            {
              marginLeft: marginLeft,
              margin: margin,
              marginRight: marginRight,
              marginTop: marginTop,
              marginBottom: marginBottom,
              marginVertical: marginVertical,
              marginHorizontal: marginHorizontal,
              opacity: opacity,
              textAlign: textAlign,
              maxWidth: maxWidth,
              lineHeight: lineHeight || getLineHeight(category),
              textTransform: textTransform,
              textDecorationLine: textDecorationLine,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
            },
            style,
          ]}
          {...rest}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  },
);

const getLineHeight = (
  category
) => {
  switch (category) {
    case 'giant':
      return 60;
    case 'header':
      return 48;
    case 'h0':
      return 44;
    case 'h1':
      return 40;
    case 'h2':
      return 40;
    case 'h22':
      return 32;
    case 'h3':
      return 30;
    case 'h4':
      return 24;
    case 'h5':
      return 22;
    case 'h6':
      return 24;
    case 'body':
      return 24;
    case 'subhead':
      return 20;
    case 'footnote':
      return 18;
    case 'c1':
      return 16;
    case 'c2':
      return 13;
    case 's1':
      return 16;
    case 's2':
      return 13;
    case 'p1':
      return 16;
    case 'p2':
      return 13;
    default:
      return 24;
  }
};
