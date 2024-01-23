import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import useLayout from './../../hooks/useLayout';

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';


function Dots({ data, translationX }) {
  const theme = useTheme();
  const { width } = useLayout();

  return (
    <View style={[styles.container]}>
      {data.map((_, i) => {
        const dotColor = useDerivedValue(() => {
          return interpolateColor(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [theme['color-basic-400'], theme['color-basic-1100'], theme['color-basic-400']],
          );
        });

        const dotWidth = useDerivedValue(() => {
          return interpolate(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [6, 30, 6],
            Extrapolate.CLAMP,
          );
        });

        const dotStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: dotColor.value,
            width: dotWidth.value,
          };
        });

        return <Animated.View key={i.toString()} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );
}

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //position: 'absolute',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});
