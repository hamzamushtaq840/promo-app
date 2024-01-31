import { useQueryClient } from '@tanstack/react-query';
import { Icon, Spinner, Text } from '@ui-kitten/components';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import { useRouter } from 'expo-router';

const ProductItem = ({ item, onPress, style }) => {
  const categoryLanguage = i18n.locale;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  const router = useRouter();

  const removePromoFromUserBookings = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, 'users', userData.userId);
      await updateDoc(userRef, {
        bookings: arrayRemove(item.id),
      });
      const webUsersRef = doc(db, 'web-users', item.parentId);
      const promoDocRef = doc(webUsersRef, 'promo', item.id);
      const promoDocSnapshot = await getDoc(promoDocRef);
      const currentBookings = promoDocSnapshot.data().bookings || [];
      const updatedBookings = currentBookings.filter(booking => booking.userId !== userData.userId);
      await updateDoc(promoDocRef, {
        bookings: updatedBookings,
      });
      await queryClient.invalidateQueries({ queryKey: ['userData'] });
      await queryClient.invalidateQueries({ queryKey: ['bookings'] });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Booking removed successfully',
      });
    } catch (error) {
      console.error('Error removing booking:', error.message);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error removing booking',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={() => {
        router.push({
          pathname: '(Dashboard)/SingleProductDetail',
          params: { item: JSON.stringify(item) },
        });
      }}>
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
              removePromoFromUserBookings();
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
