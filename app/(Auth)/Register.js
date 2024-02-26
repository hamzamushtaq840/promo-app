import { Button } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Container from '../../components/Generic/Container';
import Loader from '../../components/Generic/Loader';
import InputField from '../../components/InputField';
import { FONTS } from '../../constants/theme';
import Email from '../../svg/Email';
import Eye from '../../svg/Eye';
import EyeOff from '../../svg/EyeOff';
import Lock from '../../svg/Lock';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      if (!name) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Please enter your name',
        });
      } else if (!email) {
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
      } else if (!confirmPassword) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Please confirm your password',
        });
      } else if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Passwords do not match',
        });
      } else {
        // Check if email already exists
        const snapshot = await getDocs(collection(db, 'users'));
        const existingUser = snapshot.docs.find(doc => doc.data().email === email);
        if (existingUser) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Account with this email already exists',
          });
        } else {
          // Create user document with plain text password
          const newUserRef = await addDoc(collection(db, 'users'), {
            name: name,
            email: email,
            password: password, // Store plain text password
            bookings: [],
            favourites: [],
            fidelity: [],
          });
          const user = { uid: newUserRef.id }; // Simulating user object with just UID
          // Create notification document
          await addDoc(collection(db, 'notifications'), {
            userId: user.uid,
            allNotifications: [],
          });
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Account created',
          });
          router.push({ pathname: '/' });
        }
      }
    } catch (error) {
      Keyboard.dismiss();
      console.log(error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text
              style={{
                fontSize: 22,
                textAlign: 'left',
                marginTop: 40,
                ...FONTS['500'],
                marginBottom: 32,
              }}>
              {i18n.t('welcome')}
            </Text>
          </View>
          <InputField
            placeholder={i18n.t('fullName')}
            inputStyles={{ backgroundColor: '#F4F4F5' }}
            onChangeText={text => setName(text)}
            propIcon={
              <TouchableWithoutFeedback>
                <View>
                  <Email />
                </View>
              </TouchableWithoutFeedback>
            }
          />
          <InputField
            placeholder={i18n.t('emailPlaceholder')}
            inputStyles={{ backgroundColor: '#F4F4F5', marginTop: 32 }}
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
            inputStyles={{ backgroundColor: '#F4F4F5', marginTop: 32 }}
            onChangeText={text => setPassword(text)}
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
          />
          <InputField
            placeholder={i18n.t('confirmPasswordPlaceholder')}
            secureTextEntry={showPassword2}
            inputStyles={{ backgroundColor: '#F4F4F5', marginTop: 32 }}
            onChangeText={text => setConfirmPassword(text)}
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
                  setShowPassword2(!showPassword2);
                }}>
                <View style={{ padding: 20 }}>{showPassword2 ? <EyeOff /> : <Eye />}</View>
              </TouchableWithoutFeedback>
            }
          />
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                marginTop: 16,
                marginBottom: 56,
                ...FONTS['400'],
              }}>
              {i18n.t('c1')} <Text style={{ ...FONTS['500'] }}>{i18n.t('c2')} </Text>
            </Text>
          </View>
          <Button
            children={isLoading ? <Loader /> : i18n.t('register')}
            style={{ width: 182 }}
            onPress={handleSubmit}
          />
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text
              style={{ fontSize: 14, gap: 16, marginBottom: 10, marginTop: 8, ...FONTS['700'] }}>
              {i18n.t('login')}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/Facebook.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/Google.png')}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/Apple.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Register;
