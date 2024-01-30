import { Button, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import React from 'react';
import { Image } from 'react-native';
import { Images } from './../../assets/images';
import Content from './../../components/Generic/Content';

const NoCard = ({ setModal }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Content contentContainerStyle={styles.content}>
      <Image source={Images.fidelity.card} style={{ width: 200, height: 116, marginBottom: 64 }} />
      <Text style={{ fontSize: 22, fontFamily: 'Roboto-Medium500', marginBottom: 16 }}>
        Don’t have any card
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Roboto-Regular400',
          marginBottom: 16,
          textAlign: 'center',
          color: '#959597',
          width: 300,
        }}>
        It’s seems like you don't add any cards. Add card easily in few steps!
      </Text>
      <Button
        status={'primary'}
        // size={'small'}
        textFontFamily={'Roboto-Bold500'}
        style={{ width: '50%', textColor: 'white', alignSelf: 'center', marginTop: 80 }}
        children={'Add New Card'}
        onPress={() => {
          setModal(true);
          // router.push('/NewCard');
        }}
      />
    </Content>
  );
};

export default NoCard;

const themedStyles = StyleService.create({
  content: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
