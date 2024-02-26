import { Button, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/Generic/Loader';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import { FONTS } from '../../constants/theme';
import { auth } from '../../utlils/firebase';
import { Icons } from './../../assets/icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import NavigationAction from '../../components/Generic/NavigationAction';
import { i18n } from '../../translations';
import Toast from 'react-native-toast-message';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [isLoading, setLoading] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const handleSubmit = async () => {
    try {
      if (!email) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Enter email please',
        });
      } else {
        setLoading(true);
        await sendPasswordResetEmail(auth, email);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Email sent successfully',
        });
        setEmail('');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error sending email',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack level="2">
        <TopNavigation
          appearance="control"
          style={[styles.topNavigation, { paddingTop: 8 }]}
          // accessoryLeft={<View onPress={() => { console.log('sadads'); router.back() }} ><Image style={{ height: 20, width: 20 }} source={Icons.back} /></View>}
          accessoryLeft={<NavigationAction />}
        />
      </VStack>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        bounces={false}
        extraScrollHeight={10}>
        <VStack level="2" pt={12} pb={24} itemsCenter style={styles.layout}>
          <Image source={Icons.forgot} />
        </VStack>
        <VStack mh={16} mt={32}>
          <Text style={{ fontSize: 22, textAlign: 'left', ...FONTS['500'], marginBottom: 20 }}>
            {i18n.t('enterEmail')}
          </Text>
          <Input
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={i18n.t('emailPlaceholder')}
            style={styles.input}
          />
        </VStack>
      </KeyboardAwareScrollView>
      <VStack mh={16} mb={20}>
        <Button onPress={handleSubmit} children={isLoading ? <Loader /> : i18n.t('sendEmail')} />
      </VStack>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topNavigation: {
    paddingHorizontal: 16,
  },
  content: {
    // height:'100%'
  },
  layout: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // height: '80%',
    justifyContent: 'flex-end',
  },
  input: {
    flex: 1,
    marginTop: 0,
  },
});

export default Register;
