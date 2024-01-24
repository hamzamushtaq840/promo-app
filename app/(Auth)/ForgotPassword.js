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
import { useCustomToast } from '../../hooks/useCustomToast';
import { auth } from '../../utlils/firebase';
import { Icons } from './../../assets/icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import NavigationAction from '../../components/Generic/NavigationAction';







//check error for email






const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const openDialog = useCustomToast();
  const [isLoading, setLoading] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const handleSubmit = async () => {
    try {
      if (!email) {
        openDialog({ title: 'Enter email please' });
      } else {
        Keyboard.dismiss()
        setLoading(true);
        await sendPasswordResetEmail(auth, email);
        openDialog({ title: 'Email sent successfully' });
        setEmail('')
      }
    } catch (error) {
      console.log(error);
      openDialog({ title: 'Error sending email' });
    } finally {
      setLoading(false);
    }
  }

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
          <Text style={{ fontSize: 22, textAlign: 'left', ...FONTS['500'], marginBottom: 20 }}>Enter Email</Text>
          <Input value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={styles.input} />
        </VStack>
      </KeyboardAwareScrollView>
      <VStack mh={16} mb={20}>
        <Button onPress={handleSubmit} children={isLoading ? <Loader /> : 'Send Email'} />
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