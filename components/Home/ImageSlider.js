import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text } from 'react-native';

const ImageSlider = ({ images }) => {
  const { width } = Dimensions.get('window');
  const height = 418;
  const [active, setActive] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextIndex = (active + 1) % images.length;
      scrollViewRef.current.scrollTo({
        animated: true,
        x: nextIndex * width,
        y: 0,
      });
      setActive(nextIndex);
    }, 3000); // Adjust the interval time as needed (in milliseconds)

    return () => clearInterval(slideInterval);
  }, [active, images?.length]);

  const onScrollChange = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}>
        {images?.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width, height, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images?.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 50,
  },
  activeDot: {
    color: '#FFF',
    fontSize: 50,
  },
});

export default ImageSlider;
