import React, { memo, useEffect } from 'react';
import { Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { doc, updateDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import IDivider from '../Generic/IDivider';
import Loader from '../Generic/Loader';
import Text from '../Generic/Text';
import VStack from '../Generic/VStack';

const Information = memo(() => {
  const { userData } = useUserData();
  const data = ['English', 'French'];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = React.useState(data[0]);
  const [fullName, setFullName] = React.useState(userData?.name);
  const [isLoading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkLang = async () => {
      const langExists = await AsyncStorage.getItem('lang');
      if (langExists) {
        if (langExists === 'en') {
          setDisplayValue('English');
          setSelectedIndex(new IndexPath(0));
        } else {
          setDisplayValue('French');
          setSelectedIndex(new IndexPath(1));
        }
      }
    };
    checkLang();
  }, []);

  const handleSubmit = async () => {
    if (!fullName) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter Full Name',
      });
    } else {
      try {
        setLoading(true);
        const docRef = doc(db, 'users', userData?.userId);
        await updateDoc(docRef, {
          name: fullName,
          language: displayValue,
        });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Information Updated',
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const styles = useStyleSheet(themedStyles);
  return (
    <VStack level="2" style={{ backgroundColor: 'white' }} border={16} mh={4}>
      <IDivider />
      <VStack>
        <VStack padder border={10} style={{ marginTop: 20 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>{i18n.t('name')}</Text>
          <Input
            placeholder={i18n.t('name')}
            value={fullName}
            onChangeText={text => setFullName(text)}
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
        <VStack padder border={10} style={{ marginTop: 10 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>
            {i18n.t('emailPlaceholder')}
          </Text>
          <Input
            placeholder={'Add a store name'}
            disabled
            value={userData.email}
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
        <VStack padder border={10} style={{ marginTop: 10 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>
            {i18n.t('language')}
          </Text>
          <Layout style={styles.container} level="1">
            <Select
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={async index => {
                if (data[index.row] == 'English') {
                  i18n.locale = 'en';
                  await AsyncStorage.setItem('lang', 'en');
                }
                if (data[index.row] == 'French') {
                  await AsyncStorage.setItem('lang', 'fr');
                  i18n.locale = 'fr';
                }
                setSelectedIndex(index);
                setDisplayValue(data[index.row]);
              }}>
              <SelectItem title="English" />
              <SelectItem title="French" />
            </Select>
          </Layout>
        </VStack>
      </VStack>
      <Button
        status={'primary'}
        textFontFamily={'Roboto-Bold500'}
        style={{ width: '50%', textColor: 'white', alignSelf: 'center', marginTop: 40 }}
        children={isLoading ? <Loader /> : i18n.t('update')}
        onPress={handleSubmit}
      />
    </VStack>
  );
});

export default Information;

const themedStyles = StyleService.create({
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'text-white-color',
    borderRadius: 99,
  },
  mappin: {
    width: 16,
    height: 16,
    tintColor: 'text-warning-color',
    marginRight: 4,
  },
  contentAvatar: {
    alignSelf: 'center',
    marginTop: -48,
    marginLeft: 16,
    marginBottom: 16,
  },
  container: {
    minHeight: 128,
  },
});
