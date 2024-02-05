import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui-kitten/components';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { FONTS } from '../../constants/theme';
import useUserData from '../../hooks/useUserData';
import Person from '../../svg/Person';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import { dateConverter } from '../../utlils/timeConverter';
import HStack from '../Generic/HStack';
import Loader from '../Generic/Loader';
import VStack from '../Generic/VStack';
import InputField from '../InputField';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BookingModal({ setModalVisible, item }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(null);
  const [time, setTime] = useState(new Date());
  const [time2, setTime2] = useState(null);
  const [persons, setPersons] = useState('');
  const { userData } = useUserData();
  const [bookingDetails, setBookingDetails] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDateModal(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDate2(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimeModal(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setTime2(currentTime);
  };

  const handleSubmit = async () => {
    if (!date2 || !time2 || !persons) {
      Keyboard.dismiss();
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please fill in all the details',
      });
    } else {
      try {
        setLoading(true);
        const userRef = doc(db, 'users', userData.userId);

        await updateDoc(userRef, {
          bookings: arrayUnion(item.id),
        });

        const webUsersRef = doc(db, 'web-users', item.parentId);
        const promoDocRef = doc(webUsersRef, 'promo', item.id);

        // Update the 'bookings' array inside the 'promo' document
        await updateDoc(promoDocRef, {
          bookings: arrayUnion({
            userId: userData.userId,
            date,
            time,
            persons,
            bookingDetails,
            bookedTime: new Date(),
          }),
        });

        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        setModalVisible(false);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Booking Added Successfully',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <VStack itemsCenter gap={20}>
              <Text style={{ fontSize: 22, marginBottom: 10, ...FONTS['500'] }}>
                Booking Details
              </Text>
              <HStack itemsCenter ph={20} style={{ width: windowWidth * 0.9 }}>
                <HStack itemsCenter>
                  <Text style={{ fontSize: 15, ...FONTS['500'] }}>{i18n.t('date')}</Text>
                  <Text>{date2 ? date.toLocaleDateString() : ''}</Text>
                </HStack>
                <TouchableOpacity
                  onPress={() => {
                    setShowDateModal(true);
                  }}>
                  <View>
                    <Text>{i18n.t('selectDate')}</Text>
                  </View>
                </TouchableOpacity>
              </HStack>
              {showDateModal && (
                <RNDateTimePicker
                  maximumDate={new Date(dateConverter(item?.startDate).inputFormat)}
                  onChange={handleDateChange}
                  value={date}
                />
              )}
              {/* {showDateModal && <RNDateTimePicker maximumDate={new Date(2030, 10, 20)}  onChange={handleDateChange} value={date} />} */}
              <HStack itemsCenter ph={20} style={{ width: windowWidth * 0.9 }}>
                <HStack itemsCenter>
                  <Text style={{ fontSize: 15, ...FONTS['500'] }}>{i18n.t('time')}</Text>
                  <Text>{time2 ? time2.toLocaleTimeString() : ''}</Text>
                </HStack>
                <TouchableOpacity
                  onPress={() => {
                    setShowTimeModal(true);
                  }}>
                  <View>
                    <Text>{i18n.t('selectTime')}</Text>
                  </View>
                </TouchableOpacity>
              </HStack>
              <InputField
                placeholder={i18n.t('persons')}
                inputStyles={{ backgroundColor: '#F4F4F5' }}
                value={persons}
                keyboardType="numeric"
                onChangeText={text => setPersons(text)}
                propIcon={
                  <TouchableWithoutFeedback>
                    <View>
                      <Person />
                    </View>
                  </TouchableWithoutFeedback>
                }
              />
              <InputField
                placeholder={i18n.t('remarks')}
                value={bookingDetails}
                onChangeText={text => setBookingDetails(text)}
                numberOfLines={10}
                multiline={true}
                inputStyles={{ backgroundColor: '#F4F4F5', minHeight: 80 }} // Set minHeight or height accordingly
              />
              {showTimeModal && (
                <RNDateTimePicker onChange={handleTimeChange} value={time} mode="time" />
              )}
              {/* <RNDateTimePicker /> */}
              {/* <RNDateTimePicker mode="time" /> */}
              <Button
                style={{
                  fontSize: 8,
                  width: 130,
                  height: 20,
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                }}
                children={loading ? <Loader /> : i18n.t('confirm')}
                onPress={handleSubmit}
              />
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalContainer: {
    width: windowWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 16,
  },
});

export default BookingModal;
