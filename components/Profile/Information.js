import React, { memo, useEffect } from 'react';
import { Image, ImageRequireSource } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
  Button,
  Input,
  IndexPath,
  Select,
  SelectItem,
  Layout,
} from '@ui-kitten/components';
import { Images } from './../../assets/images';
import Text from '../Generic/Text';
import HStack from '../Generic/HStack';
import VStack from '../Generic/VStack';
import IDivider from '../Generic/IDivider';
import { i18n } from '../../translations';
import useUserData from '../../hooks/useUserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import Loader from '../Generic/Loader';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utlils/firebase';
import { useCustomToast } from '../../hooks/useCustomToast';

const Information = memo(() => {
   const { userData } = useUserData();
  const data = ['English', 'French'];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = React.useState(data[0]);
  const [fullName, setFullName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false)
  const openDialog = useCustomToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkLang = async () => {
      const langExists = await AsyncStorage.getItem('lang');
      if (langExists) {
        if (langExists === 'en') {
          setDisplayValue('English');
        } else {
          setDisplayValue('French');
        }
      }
    };
    checkLang();
  }, []);

  const handleSubmit = async () => {
    if (!fullName) {
      openDialog({ title: "Please enter Full Name" });
    } 
    else {
      try {
        setLoading(true)
        const docRef = doc(db, 'users', userData.userId)
        await updateDoc(docRef, {
          name: fullName,
          language:displayValue
        })
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        openDialog({ title: 'Information Updated' });
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }
  }

  const styles = useStyleSheet(themedStyles);
  return (
    <VStack level="2" style={{ backgroundColor: 'white' }} border={16} mh={4}>
      <IDivider />
      <VStack >
        <VStack padder border={10} style={{ marginTop: 20 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>{i18n.t('name')}</Text>
          <Input
            placeholder={i18n.t('name')}
            value={fullName !== '' ? fullName : userData.name}
            onChangeText={(text) => setFullName(text)}
            accessoryLeft={<Image source={require('./../../assets/icons/store.png')} marginHorizontal={10} style={{ width: 10, height: 10 }} />}
            style={styles.userInput}
          />
        </VStack>
        <VStack padder border={10} style={{ marginTop: 10 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>{i18n.t('emailPlaceholder')}</Text>
          <Input
            placeholder={'Add a store name'}
            disabled
            value={userData.email}
            accessoryLeft={<Image source={require('./../../assets/icons/store.png')} marginHorizontal={10} style={{ width: 10, height: 10 }} />}
            style={styles.userInput}
          />
        </VStack>
        <VStack padder border={10} style={{ marginTop: 10 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>{i18n.t('language')}</Text>
          <Layout
            style={styles.container}
            level='1'
          >
            <Select
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={async(index) => {
                if (data[index.row] == 'English') {
                  i18n.locale = 'en';
                  await AsyncStorage.setItem('lang', 'en');
                }
                if (data[index.row] == 'French') {
                  console.log('i ran');
                  await AsyncStorage.setItem('lang', 'fr');
                  i18n.locale = 'fr';
                }
                setSelectedIndex(index)
                setDisplayValue(data[index.row])
              }}
            >
              <SelectItem title='English' />
              <SelectItem title='French' />
            </Select>
          </Layout>
        </VStack>
      </VStack>
      <Button
        status={'primary'}
        textFontFamily={'Roboto-Bold500'}
        style={{ width: '50%', textColor: 'white', alignSelf: 'center', marginTop: 40 }}
        children={isLoading ? <Loader /> : "Update"}
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