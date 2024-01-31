import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import useLayout from './../../hooks/useLayout';
import Text from '../Generic/Text';

const ProductItemAll = ({ item, onPress, style }) => {
  const theme = useTheme();
  const { width } = useLayout();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          width: '93%',
          height: 180,
          marginBottom: 15,
          backgroundColor: '#ccc',
          borderRadius: 16,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <Image source={{ uri: item?.photos[0] }} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ProductItemAll;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
