import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Spinner } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Container from '../components/Generic/Container';
import Loader from '../components/Generic/Loader';
import InputField from '../components/InputField';
import Email from '../svg/Email';
import Eye from '../svg/Eye';
import EyeOff from '../svg/EyeOff';
import Lock from '../svg/Lock';
import { i18n } from '../translations';
import { FONTS } from './../constants/theme';
import { db } from '../utlils/firebase';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [show, shouldShow] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        shouldShow(false);
        const userIdExists = await AsyncStorage.getItem('userId');
        if (userIdExists) {
          router.replace('(Dashboard)/Home');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        shouldShow(true);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      // success, error, info
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter your email',
      });
    } else if (!password) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter your password',
      });
    } else {
      try {
        Keyboard.dismiss();
        setLoading(true);
        // Check if user exists in the database
        const snapshot = await getDocs(collection(db, 'users'));
        const existingUser = snapshot.docs.find(doc => doc.data().email === email);
        if (existingUser && existingUser.data().password === password) {
          // Login successful
          await AsyncStorage.setItem('userId', existingUser.id); // Store user ID in AsyncStorage
          router.replace('(Dashboard)/Home');
        } else {
          // Invalid credentials
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Invalid Credentials',
          });
        }
      } catch (error) {
        // Handle any errors
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (!show)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner status="primary" />
      </View>
    );

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Image source={require('../assets/Logo.png')} style={{ width: 96, height: 96 }} />
        <View style={{ width: '100%', alignItems: 'flex-start' }}>
          <Text
            style={{
              ...FONTS['500'],
              lineHeight: 28,
              fontSize: 22,
              textAlign: 'left',
              marginTop: 80,
              marginBottom: 32,
            }}>
            {i18n.t('welcome')}
          </Text>
        </View>
        <InputField
          placeholder={i18n.t('emailPlaceholder')}
          inputStyles={{ backgroundColor: '#F4F4F5' }}
          onChangeText={text => setEmail(text)}
          propIcon={
            <TouchableWithoutFeedback>
              <View>
                <Email />
              </View>
            </TouchableWithoutFeedback>
          }
        />
        <InputField
          placeholder={i18n.t('passwordPlaceholder')}
          secureTextEntry={showPassword}
          inputStyles={{ backgroundColor: '#F4F4F5', marginTop: 20 }}
          propIcon={
            <TouchableWithoutFeedback>
              <View>
                <Lock />
              </View>
            </TouchableWithoutFeedback>
          }
          icon={
            <TouchableWithoutFeedback
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              <View style={{ padding: 20 }}>{showPassword ? <EyeOff /> : <Eye />}</View>
            </TouchableWithoutFeedback>
          }
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            router.push('(Auth)/ForgotPassword');
          }}
          style={{ width: '100%', alignItems: 'flex-end' }}>
          <Text
            style={{
              ...FONTS['400'],
              fontSize: 14,
              textAlign: 'right',
              marginBottom: 32,
              color: '#959597',
              marginTop: 10,
            }}>
            {i18n.t('forgotPassword')}
          </Text>
        </TouchableOpacity>
        <Button
          style={{ width: 182 }}
          children={isLoading ? <Loader /> : i18n.t('login')}
          onPress={handleSubmit}
        />
        <TouchableOpacity onPress={() => router.push('(Auth)/Register')}>
          <Text style={{ fontSize: 14, gap: 16, marginTop: 8, marginBottom: 40, ...FONTS['700'] }}>
            {i18n.t('register')}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          <TouchableOpacity>
            <Image source={require('../assets/Facebook.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/Google.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/Apple.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Login;
