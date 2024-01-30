import { StyleService, Text, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Barcode from 'react-native-barcode-svg';
import QRCode from 'react-native-qrcode-svg';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import HStack from '../../components/Generic/HStack';
import NavigationAction from '../../components/Generic/NavigationAction';
import VStack from '../../components/Generic/VStack';

const DisplayCard = () => {
  const styles = useStyleSheet(themedStyles);
  const params = useLocalSearchParams();
  const card = JSON.parse(params.data);
  const router = useRouter();
  return (
    <Container style={{}}>
      <TopNavigation
        alignment="start"
        title={<Text>Card Info</Text>}
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
      <Content style={styles.content}>
        <View
          style={{
            width: '100%',
            minHeight: 220,
            backgroundColor: 'black',
            borderRadius: 16,
            backgroundColor: '#3D195B',
            justifyContent: 'center',
            paddingBottom: 40,
            paddingHorizontal: card.isQrCode ? 16 : 10,
            paddingTop: 32,
          }}>
          <VStack gap={40}>
            {card?.isQrCode && (
              <HStack itemsCenter>
                <Text
                  style={{
                    fontSize: 32,
                    color: 'white',
                    lineHeight: 40,
                    fontFamily: 'Roboto-Bold700',
                  }}>
                  {card?.name}
                </Text>
                <View style={styles.qrCodeContainer}>
                  <QRCode value={'hello'} size={80} bgColor="black" fgColor="white" />
                </View>
                {/* <HStack ph={8} mb={10}>
                  <HStack
                    gap={8}
                    justify={'start'}
                    onStartShouldSetResponder={() => {
                      setCurrent('appCards');
                    }}
                    style={{ width: '50%' }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>Points</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                      }}>
                      <Text style={{ alignSelf: 'center', color: 'white' }}>645</Text>
                    </View>
                  </HStack>
                  <HStack
                    gap={8}
                    justify={'start'}
                    onStartShouldSetResponder={() => {
                      setCurrent('appCards');
                    }}
                    style={{ width: '50%' }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>Voucher</Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 12,
                        paddingHorizontal: 16,
                      }}>
                      <Text style={{ alignSelf: 'center', color: 'white' }}>645</Text>
                    </View>
                  </HStack>
                </HStack> */}
              </HStack>
            )}
            {!card?.isQrCode && (
              <VStack gap={10}>
                <Text
                  style={{
                    fontSize: 32,
                    color: 'white',
                    lineHeight: 40,
                    fontFamily: 'Roboto-Bold700',
                  }}>
                  {card?.name}
                </Text>
                <View style={styles.qrCodeContainer}>
                  <Barcode value={card?.data} format="CODE128" />
                </View>
              </VStack>
            )}
          </VStack>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 40,
            fontFamily: 'Roboto-Bold700',
          }}>
          {card?.data}
        </Text>
      </Content>
    </Container>
  );
};

export default DisplayCard;

const themedStyles = StyleService.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  qrCodeContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});
