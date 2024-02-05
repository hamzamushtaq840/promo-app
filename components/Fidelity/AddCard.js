import { Button, Input, Radio, RadioGroup, Text } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { i18n } from '../../translations';
import QRCode from 'react-native-qrcode-svg';
import { Images } from '../../assets/images';
import VStack from '../../components/Generic/VStack';
import Content from './../../components/Generic/Content';
import { FONTS } from '../../constants/theme';
import Toast from 'react-native-toast-message';
import Barcode from 'react-native-barcode-svg';
import useUserData from '../../hooks/useUserData';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utlils/firebase';
import { useQueryClient } from '@tanstack/react-query';
import Loader from '../Generic/Loader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddCard = ({ setModal }) => {
  const [hasPermission, setHasPermission] = useState('');
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const cameraRef = useRef(null);
  const [shouldScan, setShouldScan] = useState(false);
  const [current, setCurrent] = useState('appCards');
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isBarCode, setIsBarCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const renderQRCode = () => {
    return (
      <View style={styles.qrCodeContainer}>
        <QRCode value={data} size={150} bgColor="black" fgColor="white" />
      </View>
    );
  };
  const renderBarCode = () => {
    return (
      <View style={styles.qrCodeContainer}>
        <Barcode value={data} format="CODE128" />
      </View>
    );
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setModal(false);
      return true; // Prevent default behavior (exiting the app)
    });

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, [setModal]);

  const handleBarCodeScanned = async ({ type, data }) => {
    // "type": 1 for barcode
    //"type": 256 for qr code
    if (type === 256) {
      setIsBarCode(false);
    } else {
      setIsBarCode(true);
    }
    if (shouldScan) {
      // if (data) {
      //   //has our qr code type then setSelectedIndex to 0
      // } else {
      //   //setSelectedIndex to 1
      // }
      setSelectedIndex(1);
      setData(data);
      setScanned(true);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (!text) {
      Toast.show({
        type: 'error',
        text1: 'Please add a store name',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } else {
      let postData = {
        name: text,
        type: selectedIndex === 1 ? 'Third Party Card' : 'App Card',
        data,
        isQrCode: isBarCode ? false : true,
      };
      try {
        setLoading(true);
        const userRef = doc(db, 'users', userData.userId);

        await updateDoc(userRef, {
          fidelity: arrayUnion(postData),
        });

        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        setModal(false);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Card Added Successfully',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setModal(false)}>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Content contentContainerStyle={styles.content}>
              <Text
                style={{ fontSize: 22, marginBottom: 10, ...FONTS['500'], textAlign: 'center' }}>
                {i18n.t('addCard')}
              </Text>
              <VStack padder border={10} gap={4}>
                <Text style={{ fontSize: 14, color: '#959597', marginBottom: 5, lineHeight: 24 }}>
                  {i18n.t('name')}
                </Text>
                <Input
                  placeholder={i18n.t('name')}
                  accessoryLeft={
                    <Image
                      source={require('./../../assets/icons/store.png')}
                      marginHorizontal={10}
                      style={{ width: 10, height: 10 }}
                    />
                  }
                  value={text}
                  onChangeText={text => setText(text)}
                  style={styles.userInput}
                />
              </VStack>
              {/* <VStack padder style={{ marginTop: 10 }}>
              <RadioGroup
                style={{ flexDirection: 'row' }}
                selectedIndex={selectedIndex}
                onChange={index => setSelectedIndex(index)}>
                <Radio>App Card</Radio>
                <Radio>Third Party Card</Radio>
              </RadioGroup>
            </VStack> */}
              <View
                style={{
                  height: 380,
                  padding: 16,
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <View style={{ borderRadius: 16, overflow: 'hidden', width: '100%' }}>
                  <Camera
                    ref={cameraRef}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ width: '100%', height: '100%', borderRadius: 16 }}
                  />
                  <View
                    style={{
                      width: isBarCode ? '90%' : '60%',
                      height: isBarCode ? '90%' : '60%',
                      position: 'absolute',
                      top: isBarCode ? 10 : 70,
                      alignSelf: 'center',
                      zIndex: 20,
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}>
                    {!shouldScan && (
                      <View
                        onStartShouldSetResponder={() => {
                          setShouldScan(true);
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white', width: 100, textAlign: 'center' }}>
                          {i18n.t('tapTo')}
                        </Text>
                        <Text style={{ color: 'white', width: 150, textAlign: 'center' }}>
                          {i18n.t('or')}
                        </Text>
                      </View>
                    )}
                    {data && (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 10 }}>
                          {!isBarCode && renderQRCode()}
                          {isBarCode && renderBarCode()}
                        </View>
                      </View>
                    )}
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 30,
                        height: 2,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: 2,
                        height: 30,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 30,
                        height: 2,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: 2,
                        height: 30,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: 30,
                        height: 2,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: 2,
                        height: 30,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 30,
                        height: 2,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: 2,
                        height: 30,
                        backgroundColor: data ? '#44D646' : 'white',
                      }}
                    />
                  </View>
                  {(!shouldScan || data !== null) && (
                    <BlurView
                      intensity={100}
                      tint={'dark'}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        alignSelf: 'center',
                        color: 'red',
                        zIndex: 10,
                      }}></BlurView>
                  )}
                </View>
              </View>
              {data && (
                <View style={{ alignSelf: 'center' }}>
                  <Image
                    onStartShouldSetResponder={() => {
                      setData(null);
                      setScanned(false);
                      setIsBarCode(false);
                    }}
                    source={Images.fidelity.rescan}
                    style={{ width: 77, height: 24, marginBottom: 20 }}
                  />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Button
                  status={'primary'}
                  style={{ width: '50%', textColor: 'white', alignSelf: 'center' }}
                  children={loading ? <Loader /> : i18n.t('add')}
                  disabled={!data}
                  onPress={() => {
                    handleSubmit();
                    // router.push('/AllFidelityCards');
                  }}
                />
              </View>
            </Content>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: windowWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 16,
  },
});
