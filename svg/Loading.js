import React, { useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Loading() {
  const [rotateValue,setRotateValue] = useState(new Animated.Value(0))

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }),
  ).start();

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={35} height={35} viewBox="0 0 100 100">
        <AnimatedCircle
          cx={50}
          cy={50}
          fill="none"
          stroke="#ffffff"
          strokeWidth={10}
          r={35}
          strokeDasharray={[150, 100]} // Updated strokeDasharray for spinning effect
          strokeLinecap="round"
          transform={[{ rotate: rotate }]}
        />
      </Svg>
    </View>
  );
}
