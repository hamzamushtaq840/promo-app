import React, { memo } from 'react';
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

const Information = memo(() => {
  const {userData} =useUserData()

  const data = [
    'English',
    'French',
  ];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const displayValue = data[selectedIndex.row];
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack level="2" style={{ backgroundColor: 'white' }} border={16} mh={4}>
      <IDivider />
      <VStack >
        <VStack padder border={10} style={{ marginTop: 20 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>{i18n.t('name')}</Text>
          <Input
            placeholder={'Add a store name'}
            value={userData.name}
            accessoryLeft={<Image source={require('./../../assets/icons/store.png')} marginHorizontal={10} style={{ width: 10, height: 10 }} />}
            style={styles.userInput}
          />
        </VStack>
        <VStack padder border={10} style={{ marginTop: 10 }} gap={4}>
          <Text style={{ fontSize: 14, color: '#959597', lineHeight: 24 }}>Email</Text>
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
              onSelect={index => {
                if (data[index.row] == 'English') {
                  i18n.locale = 'en';
                }
                if (data[index.row] == 'French') {
                  i18n.locale = 'fr';
                }
                setSelectedIndex(index)
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
        children={'Update'}
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
