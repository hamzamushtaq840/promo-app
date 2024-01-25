import { StyleService, TopNavigation, useStyleSheet, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../components/Generic/Container';
import HStack from '../../components/Generic/HStack';
import VStack from '../../components/Generic/VStack';
import Content from './../../components/Generic/Content';
import NavigationAction from './../../components/Generic/NavigationAction';
import QRCode from 'react-native-qrcode-svg';

const AllFidelityCards = () => {
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();
  const [current, setCurrent] = useState('appCards');

  return (
    <Container
      style={{
        paddingBottom: 0,
      }}>
      <TopNavigation
        alignment="start"
        title={<Text>Fidelity Cards</Text>}
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
      <Content contentContainerStyle={styles.content}>
        <HStack ph={8} mb={10}>
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
            <Text style={{ alignSelf: 'center' }}>App Cards</Text>
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
            <Text style={{ alignSelf: 'center' }}>3rd Party Cards</Text>
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

        <View
          style={{
            marginTop: 16,
            marginBottom: 40,
            width: '100%',
            height: 220,
            backgroundColor: 'black',
            borderRadius: 16,
            backgroundColor: '#3D195B',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingTop: 32,
            paddingBottom: 40,
          }}>
          <VStack gap={40}>
            <HStack itemsCenter>
              <Text
                style={{
                  fontSize: 32,
                  color: 'white',
                  lineHeight: 40,
                  fontFamily: 'Roboto-Bold700',
                }}>
                Apple Store
              </Text>
              <View style={styles.qrCodeContainer}>
                <QRCode value={'hello'} size={80} bgColor="black" fgColor="white" />
              </View>
            </HStack>
            <HStack ph={8} mb={10}>
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
            </HStack>
          </VStack>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#959597',
            paddingHorizontal: 12,
            lineHeight: 24,
            marginBottom: 16,
          }}>
          ACTIVITY
        </Text>

        <VStack gap={10}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingVertical: 22,
              borderRadius: 16,
              shadowColor: '#ccc',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.5,
              elevation: 3,
            }}>
            <Text style={{ alignSelf: 'center', color: 'black' }}>Domino’s Pizza</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 12,
                paddingHorizontal: 16,
              }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>645</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingVertical: 22,
              borderRadius: 16,
              shadowColor: '#ccc',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.5,
              elevation: 3,
            }}>
            <Text style={{ alignSelf: 'center', color: 'black' }}>Domino’s Pizza</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 12,
                paddingHorizontal: 16,
              }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>645</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingVertical: 22,
              borderRadius: 16,
              shadowColor: '#ccc',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.5,
              elevation: 3,
            }}>
            <Text style={{ alignSelf: 'center', color: 'black' }}>Domino’s Pizza</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 12,
                paddingHorizontal: 16,
              }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>645</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              paddingVertical: 22,
              borderRadius: 16,
              shadowColor: '#ccc',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.5,
              elevation: 3,
            }}>
            <Text style={{ alignSelf: 'center', color: 'black' }}>Domino’s Pizza</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 12,
                paddingHorizontal: 16,
              }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>645</Text>
            </View>
          </View>
        </VStack>
      </Content>
    </Container>
  );
};

export default AllFidelityCards;

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
