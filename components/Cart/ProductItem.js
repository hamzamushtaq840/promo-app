import { Text, useTheme, Icon } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';



const ProductItem = ({ item, onPress, style }) => {
  const theme = useTheme();
  const { name, rate, sales, min_amount, max_amount, image } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Roboto-Medium500' }} >{name}</Text>
        <View style={styles.row1}>
          <Text style={{ fontFamily: 'Roboto-Medium500', fontSize: 16, lineHeight: 24 }}>
            $175.00
          </Text>
          <Icon name="delete" style={{ width: 24, height: 24 }} color="red" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 3
  },
  image: {
    width: 148,
    height: 80,
    marginRight: 24,
    borderRadius: 12
  },
  content: {
    flex: 1,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
