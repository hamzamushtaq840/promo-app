import { StyleService, TopNavigation, useStyleSheet, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../Generic/Container';
import HStack from '../Generic/HStack';
import VStack from '../Generic/VStack';
import Content from '../Generic/Content';
import NavigationAction from '../Generic/NavigationAction';
import QRCode from 'react-native-qrcode-svg';
import useUserData from '../../hooks/useUserData';
import { i18n } from './../../translations';

const AllFidelityCards = ({ current, setCurrent }) => {
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();
  const { userData } = useUserData();
  const [appCards, setAppCards] = useState([]);
  const [thirdPartyCards, setThirdPartyCards] = useState([]);

  useEffect(() => {
    let tempAppCards = [];
    let tempThirdPartyCards = [];
    userData.fidelity.forEach(element => {
      if (element.type === 'Third Party Card') {
        tempThirdPartyCards.push(element);
      } else {
        tempAppCards.push(element);
      }
    });
    setAppCards(tempAppCards);
    setThirdPartyCards(tempThirdPartyCards);
  }, [userData.fidelity]);

  const renderItem = (item, key) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          router.push({
            pathname: `DisplayCard`,
            params: { data: JSON.stringify(item) },
          });
        }}>
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
          <Text style={{ alignSelf: 'center', color: 'black' }}>{item?.name}</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 12,
              paddingHorizontal: 16,
            }}>
            <Text style={{ alignSelf: 'center', color: 'black' }}>
              {item.isQrCode ? i18n.t('qrCode') : i18n.t('barCode')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNoCardsMessage = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text category="h6" appearance="hint">
          {current === 'appCards' ? 'No App Cards' : 'No Third Party Cards'}
        </Text>
      </View>
    );
  };

  return (
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
          <Text style={{ alignSelf: 'center' }}>{i18n.t('appCards')}</Text>
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
          <Text style={{ alignSelf: 'center' }}> {i18n.t('thirdPartyCards')}</Text>
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

      <VStack gap={10}>
        {current === 'appCards' && appCards.length > 0
          ? appCards.map((item, key) => renderItem(item, key))
          : current === 'appCards' && renderNoCardsMessage()}

        {current === '3rdPartyCards' && thirdPartyCards.length > 0
          ? thirdPartyCards.map((item, key) => renderItem(item, key))
          : current === '3rdPartyCards' && renderNoCardsMessage()}
      </VStack>
    </Content>
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
