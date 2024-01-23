import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { ScrollView } from 'react-native';

const Content = ({ style, contentContainerStyle, children, padder, level, ...props }) => {
  const theme = useTheme();
  return (
    <ScrollView
      {...props}
      style={[
        padder && { paddingHorizontal: 24 },
        { backgroundColor: theme[`background-basic-color-${level}`] },
        style,
      ]}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}>
      {children}
    </ScrollView>
  );
};

export default Content;
