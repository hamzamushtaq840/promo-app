import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useUserData from '../../hooks/useUserData';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@ui-kitten/components';
import VStack from '../Generic/VStack';
import { FONTS } from '../../constants/theme';
import HStack from '../Generic/HStack';
import InputField from '../InputField';
import { i18n } from '../../translations';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Email from '../../svg/Email';
import Person from '../../svg/Person';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BookingModal({ setModalVisible }) {
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [persons, setPersons] = useState(1);
  const [bookingDetails, setBookingDetails] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDateModal(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimeModal(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleSubmit = async () => {
    if (!bookingDetails) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter booking details',
      });
    } else {
      try {
        setLoading(true);
        const docRef = doc(db, 'users', userData.userId);
        await updateDoc(docRef, {
          bookingDetails,
          date,
          time,
          persons,
        });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Booking Details Updated',
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
                  <Text style={{ fontSize: 15, ...FONTS['500'] }}>{date && i18n.t('date')}</Text>
                  <Text>{date.toLocaleDateString()}</Text>
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
              {showDateModal && <RNDateTimePicker onChange={handleDateChange} value={date} />}
              {/* {showDateModal && <RNDateTimePicker maximumDate={new Date(2030, 10, 20)}  onChange={handleDateChange} value={date} />} */}
              <HStack itemsCenter ph={20} style={{ width: windowWidth * 0.9 }}>
                <HStack itemsCenter>
                  <Text style={{ fontSize: 15, ...FONTS['500'] }}>{time && i18n.t('time')}</Text>
                  <Text>{time.toLocaleTimeString()}</Text>
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
                onPress={() => {
                  console.log('post data');
                }}>
                {i18n.t('confirm')}
              </Button>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
