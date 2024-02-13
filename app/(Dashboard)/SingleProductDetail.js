import { useQueryClient } from '@tanstack/react-query';
import { Button, Icon, Spinner, TopNavigation } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import BookingModal from '../../components/Cart/BookingModal';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import HStack from '../../components/Generic/HStack';
import Loader from '../../components/Generic/Loader';
import NavigationAction from '../../components/Generic/NavigationAction';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import ImageSlider from '../../components/Home/ImageSlider';
import useLayout from '../../hooks/useLayout';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import { dateConverter } from '../../utlils/timeConverter';

const SVGComponent = props => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.94922 14.7081C10.2674 14.7081 10.5388 14.5864 10.7821 14.3337L17.9229 7.03392C18.1287 6.83738 18.2317 6.57534 18.2317 6.27586C18.2317 5.66754 17.7638 5.19025 17.1461 5.19025C16.8466 5.19025 16.5752 5.31191 16.3693 5.5178L9.94922 12.097L3.52913 5.5178C3.31388 5.31191 3.04248 5.19025 2.743 5.19025C2.13468 5.19025 1.66675 5.66754 1.66675 6.27586C1.66675 6.57534 1.76969 6.83738 1.97559 7.03392L9.11629 14.3337C9.35962 14.5864 9.63102 14.6987 9.94922 14.7081Z"
      fill="#ABABAB"
    />
  </Svg>
);

const SingleProductDetail = () => {
  const { width } = useLayout();
  const [maximize, setMaximize] = useState(false);
  const heightAnim = useRef(new Animated.Value(360)).current;
  const params = useLocalSearchParams();
  const item = JSON.parse(params?.item);
  const router = useRouter();
  const categoryLanguage = i18n.locale;
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  let abc = { ...userData };
  const bookings = abc?.bookings?.find(b => b.promoId === item.id);
  let id = userData?.userId;

  const handlePress = () => {
    if (maximize === false) {
      setMaximize(true);
      Animated.timing(heightAnim, {
        toValue: 480,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      setMaximize(false);
      Animated.timing(heightAnim, {
        toValue: 360,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  const addPromoToUserFavorites = async () => {
    try {
      setLoading(true); // Set loading to true when the operation starts

      // Get a reference to the user document
      const userRef = doc(db, 'users', userData.userId);

      // Update the user document to add the promoId to the favorites array
      await updateDoc(userRef, {
        favourites: arrayUnion(item.id),
      });

      await queryClient.invalidateQueries({ queryKey: ['userData'] });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Added to favourites',
      });
    } catch (error) {
      console.error('Error adding promo to favorites:', error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const removePromoFromUserFavorites = async (userId, promoId) => {
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

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Removed from favorites',
      });
    } catch (error) {
      console.error('Error removing promo from favorites:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    try {
      setLoading2(true);
      const webUsersRef = doc(db, 'web-users', item.parentId);
      const promoDocRef = doc(webUsersRef, 'promo', item.id);

      const promoSnapshot = await getDoc(promoDocRef);
      const promoData = promoSnapshot.data();

      if (promoData) {
        const updatedBookings = promoData.bookings.map(booking => {
          if (booking.userId === id) {
            return { ...booking, isCanceled: true };
          }
          return booking;
        });

        await updateDoc(promoDocRef, { bookings: updatedBookings });
      }

      // Find the user's document
      const userRef = doc(db, 'users', id);
      const userSnapshot = await getDoc(userRef);
      const userData2 = userSnapshot.data();

      if (userData2) {
        // Find the booking in the user's bookings array based on promoId
        const updatedBookings = userData2.bookings.map(booking => {
          if (booking.promoId === item.id) {
            return { ...booking, isCanceled: true };
          }
          return booking;
        });

        // Update the user's document with the updated bookings array
        await updateDoc(userRef, { bookings: updatedBookings });
      }
      await queryClient.invalidateQueries({ queryKey: ['userData'] });
    } catch (error) {
      console.error('Error canceling booking:', error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <Container style={{ flex: 1, paddingBottom: 0 }}>
      <Content style={{ flex: 1 }}>
        <TopNavigation
          alignment="start"
          title={
            <Text fon tWeight="bold">
              {i18n.t('promoDetails')}
            </Text>
          }
          accessoryLeft={
            <NavigationAction
              marginRight={20}
              height={16}
              width={20}
              icon="back"
              onPress={() => {
                router.back();
              }}
            />
          }
        />
        <ImageSlider images={item?.photos} />
      </Content>

      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            width: width,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            backgroundColor: 'white',
          },
          { height: heightAnim },
        ]}>
        <Text style={{ fontFamily: 'Roboto-Bold700', fontSize: 22, marginBottom: 14 }}>
          {item?.promoDetails[categoryLanguage]?.title}
        </Text>

        <HStack justify="space-between" style={{ width: '100%' }}>
          <VStack>
            {item?.webLink && (
              <HStack itemsCenter justify="flex-start" gap={8}>
                <Icon name="link" style={{ width: 12, height: 12 }} color="red" />
                <Text>{item?.webLink}</Text>
              </HStack>
            )}
            <HStack itemsCenter justify="flex-start" pl={2} gap={8}>
              <Icon name="calendar" style={{ width: 12, height: 12 }} color="red" />
              <Text>
                {dateConverter(item?.startDate)?.customFormat} -
                {dateConverter(item?.endDate)?.customFormat}
              </Text>
            </HStack>
            {item?.parentData?.companyAddresses.map((address, index) => {
              return (
                <ScrollView key={index} style={{ maxHeight: 100 }}>
                  {showAll || index === 0 ? (
                    <React.Fragment>
                      {/* Address Information */}
                      <HStack itemsCenter justify="flex-start" gap={8}>
                        <Icon name="location" style={{ width: 16, height: 16 }} color="red" />
                        <Text>
                          {address.address}, {address.city}
                        </Text>
                      </HStack>

                      {/* Phone Information */}
                      <HStack itemsCenter justify="flex-start" gap={8}>
                        <Icon name="phone" style={{ width: 16, height: 16 }} color="red" />
                        <Text>{address.phoneNumber}</Text>
                      </HStack>
                    </React.Fragment>
                  ) : null}
                </ScrollView>
              );
            })}
          </VStack>

          <VStack style={{ justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={removePromoFromUserFavorites}>
              {userData?.favourites?.includes(item.id) && !loading && (
                <Icon name="heartFilled" style={{ width: 24, height: 24 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={addPromoToUserFavorites}>
              {userData?.favourites?.includes(item.id) === false && !loading && (
                <Icon name="heart" style={{ width: 24, height: 24 }} />
              )}
            </TouchableOpacity>
            {loading && <Spinner size="small" />}
          </VStack>
        </HStack>
        {item?.parentData?.companyAddresses.length > 1 && (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={{ alignSelf: 'flex-end', color: '#959597', fontSize: 12 }}>
              {showAll ? i18n.t('viewLess') : i18n.t('viewAddresses')}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1, marginBottom: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              numberOfLines={maximize ? undefined : 3}
              ellipsizeMode="tail"
              style={{ color: '#959597' }}>
              {item?.promoDetails[categoryLanguage]?.description}
            </Text>
            {!maximize && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 30,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}
              />
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: !maximize ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }],
          }}>
          <SVGComponent onPress={handlePress} />
        </TouchableOpacity>

        <HStack style={{ alignItems: 'center' }}>
          <Text lineHeight={32} style={{ fontSize: 32, fontFamily: 'Roboto-Bold700' }}>
            {item.price} $
          </Text>
          {item?.canBook === true && (
            <Button
              status={'primary'}
              size={'small'}
              disabled={bookings && bookings.isCanceled}
              onPress={() => {
                if (!bookings) {
                  setModal(true);
                } else {
                  if (!bookings.isCanceled) {
                    cancelBooking();
                  }
                }
              }}
              style={{ width: '182', textColor: 'white', alignSelf: 'center' }}
              children={
                loading2 ? (
                  <Loader />
                ) : bookings ? (
                  bookings.isCanceled ? (
                    'Canceled'
                  ) : (
                    'Cancel'
                  )
                ) : (
                  i18n.t('book')
                )
              }
            />
          )}
        </HStack>
      </Animated.View>
      {modal && <BookingModal item={item} setModalVisible={setModal} />}
    </Container>
  );
};

export default SingleProductDetail;
