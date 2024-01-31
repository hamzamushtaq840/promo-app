import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonLoader = () => {
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const startFadeAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startFadeAnimation();
  }, []);

  return (
    <View style={styles.skeletonContainer}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            width: 280,
            height: 152,
            borderRadius: 16,
            backgroundColor: 'rgba(200, 200, 200, 0.7)', // Adjust color as needed
            opacity: fadeAnimation,
          },
        ]}
      />
    </View>
  );
};

const Skeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 16,
    marginLeft: 12,
    marginTop: 20,
  },
  skeletonContainer: {
    overflow: 'hidden',
    marginRight: 8,
  },
  skeleton: {
    flex: 1,
  },
});

export default Skeleton;
