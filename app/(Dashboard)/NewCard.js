import { Button, Input, Text, TopNavigation } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { default as React, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Images } from '../../assets/images';
import Container from '../../components/Generic/Container';
import HStack from '../../components/Generic/HStack';
import VStack from '../../components/Generic/VStack';
import Navbar from '../../components/Navbar';
import Content from './../../components/Generic/Content';
import NavigationAction from './../../components/Generic/NavigationAction';

const NewCard = () => {
  const [hasPermission, setHasPermission] = useState('');
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const cameraRef = useRef(null);
  const [shouldScan, setShouldScan] = useState(false);
  const [current, setCurrent] = useState('appCards');
  const router = useRouter();

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

  const handleBarCodeScanned = async ({ type, data }) => {
    // "type": 1 for barcode
    //"type": 256 for qr code
    if (shouldScan) {
      setData(data);
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

  return (
    <Container style={{ flex: 1 }}>
      <TopNavigation
        alignment="start"
        title={<Text>Add New Card</Text>}
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
      <HStack padder mb={10}>
        <View
          onStartShouldSetResponder={() => {
            setCurrent('appCards');
          }}
          style={{
            width: '50%',
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
            paddingVertical: 12,
          }}>
          <Text style={{ alignSelf: 'center', fontSize: 16 }}>App Cards</Text>
          {current === 'appCards' && (
            <View
              style={{
                width: '100%',
                height: 2,
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'black',
              }}></View>
          )}
        </View>
        <View
          onStartShouldSetResponder={() => {
            setCurrent('3rdPartyCards');
          }}
          style={{
            width: '50%',
            justifyContent: 'center',
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
            paddingVertical: 12,
          }}>
          <Text style={{ alignSelf: 'center', fontSize: 16 }}>3rd Party Cards</Text>
          {current === '3rdPartyCards' && (
            <View
              style={{
                width: '100%',
                height: 2,
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'black',
              }}></View>
          )}
        </View>
      </HStack>

      <Content contentContainerStyle={styles.content}>
        <VStack padder border={10} style={{ marginTop: 20 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', paddingHorizontal: 12, lineHeight: 24 }}>
            STORE NAME
          </Text>
          <Input
            placeholder={'Add a store name'}
            accessoryLeft={
              <Image
                source={require('./../../assets/icons/store.png')}
                marginHorizontal={10}
                style={{ width: 10, height: 10 }}
              />
            }
            style={styles.userInput}
          />
        </VStack>
        <View style={{ height: 380, padding: 16, justifyContent: 'center' }}>
          <View style={{ borderRadius: 16, overflow: 'hidden' }}>
            <Camera
              ref={cameraRef}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ width: '100%', height: '100%', borderRadius: 16 }}
            />
            <View
              style={{
                width: '60%',
                height: '60%',
                position: 'absolute',
                top: 70,
                alignSelf: 'center',
                zIndex: 20,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
              {!shouldScan && (
                <View
                  onStartShouldSetResponder={() => {
                    console.log('write');
                    setShouldScan(true);
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', width: 100, textAlign: 'center' }}>
                    Tap to scan
                  </Text>
                  <Text style={{ color: 'white', width: 150, textAlign: 'center' }}>
                    QR or Barcode
                  </Text>
                </View>
              )}
              {data && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 10 }}>
                    {renderQRCode()}
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
            children={'Add'}
            disabled={!data}
            onPress={() => {
              router.push('/AllFidelityCards');
            }}
          />
        </View>
      </Content>
      <Navbar />
    </Container>
  );
};

export default NewCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: '115%',
    padding: 0,
  },
  camera: {
    height: 580,
    borderRadius: 16,
    aspectRatio: 1 / 2,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
});
