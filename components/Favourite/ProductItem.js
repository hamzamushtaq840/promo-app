import { useQueryClient } from '@tanstack/react-query';
import { Text, useTheme, Icon, Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import useUserData from '../../hooks/useUserData';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utlils/firebase';
import { i18n } from '../../translations';
import Toast from 'react-native-toast-message';

const ProductItem = ({ item, onPress, style }) => {
  const theme = useTheme();
  const { name, rate, sales, min_amount, max_amount, image } = item;
  const categoryLanguage = i18n.locale;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  const removePromoFromUserFavorites = async () => {
    try {
      setLoading(true); // Set loading to true when the operation starts

      // Get a reference to the user document
      const userRef = doc(db, 'users', userData.userId);

      // Update the user document to remove the promoId from the favorites array
      await updateDoc(userRef, {
        favourites: arrayRemove(item.id),
      });

      // Invalidate the user data query to reflect the changes
      await queryClient.invalidateQueries({ queryKey: ['userData'] });
      await queryClient.invalidateQueries({ queryKey: ['favourites'] });

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Removed from favourites',
      });
    } catch (error) {
      console.error('Error removing promo from favourites:', error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: item?.photos[0] }} style={styles.image} />
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Roboto-Medium500' }}>
          {item.promoDetails[categoryLanguage]?.title}
        </Text>
        <View style={styles.row1}>
          <Text style={{ fontFamily: 'Roboto-Medium500', fontSize: 16, lineHeight: 24 }}>
            $ {item.price}
          </Text>
          <TouchableOpacity
            onPress={() => {
              removePromoFromUserFavorites();
            }}>
            {!loading && <Icon name="delete" style={{ width: 24, height: 24 }} color="red" />}
            {loading && <Spinner size="small" />}
          </TouchableOpacity>
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
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 3,
  },
  image: {
    width: 148,
    height: 80,
    marginRight: 24,
    borderRadius: 12,
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
