import { Button } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Container from '../../components/Generic/Container';
import Loader from '../../components/Generic/Loader';
import InputField from '../../components/InputField';
import { FONTS } from '../../constants/theme';
import { useCustomToast } from '../../hooks/useCustomToast';
import Email from '../../svg/Email';
import Eye from '../../svg/Eye';
import EyeOff from '../../svg/EyeOff';
import Lock from '../../svg/Lock';
import { auth, db } from '../../utlils/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const openDialog = useCustomToast();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      Keyboard.dismiss();
      setLoading(true)
      if (!name) {
        openDialog({ title: "Please enter your name" });
      }
      else if (!email) {
        openDialog({ title: "Please enter your email" });
      } else if (!password) {
        openDialog({ title: "Please enter your password" });
      } else if (!confirmPassword) {
        openDialog({ title: "Please confirm your password" });
      } else if (password !== confirmPassword) {
        openDialog({ title: "Passwords do not match" });
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
          bookings:[],
          favourites:[]
        })
        openDialog({ title: 'Account created' });
        router.push({ pathname: '/' })
      }
    } catch (error) {
      Keyboard.dismiss()
      if (error.code === 'auth/email-already-in-use') {
        openDialog({ title: 'Account with this email already exists' })
      } else if (error.code === 'auth/invalid-login-credentials') {
        openDialog({ title: 'Invalid credentials' })
      }
      else {
        openDialog({ title: error.message })
      }
    } finally { setLoading(false) }
  };

  return (
    <Container>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
          <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 22, textAlign: 'left', marginTop: 40, ...FONTS['500'], marginBottom: 32 }}>Get Started!</Text>
          </View>
          <InputField placeholder="Full name" inputStyles={{ backgroundColor: "#F4F4F5" }} onChangeText={(text) => setName(text)} propIcon={<TouchableWithoutFeedback ><View ><Email /></View></TouchableWithoutFeedback>} />
          <InputField placeholder="Email address" inputStyles={{ backgroundColor: "#F4F4F5", marginTop: 32 }} onChangeText={(text) => setEmail(text)} propIcon={<TouchableWithoutFeedback ><View ><Email /></View></TouchableWithoutFeedback>} />
          <InputField placeholder="Password" secureTextEntry={showPassword} inputStyles={{ backgroundColor: "#F4F4F5", marginTop: 32 }} onChangeText={(text) => setPassword(text)} propIcon={<TouchableWithoutFeedback ><View ><Lock /></View></TouchableWithoutFeedback>} icon={<TouchableWithoutFeedback onPress={() => { setShowPassword(!showPassword) }}><View style={{ padding: 20 }}>{showPassword ? <EyeOff /> : <Eye />}</View></TouchableWithoutFeedback>} />
          <InputField placeholder="Confirm password" secureTextEntry={showPassword2} inputStyles={{ backgroundColor: "#F4F4F5", marginTop: 32 }} onChangeText={(text) => setConfirmPassword(text)} propIcon={<TouchableWithoutFeedback ><View ><Lock /></View></TouchableWithoutFeedback>} icon={<TouchableWithoutFeedback onPress={() => { setShowPassword2(!showPassword2); }}><View style={{ padding: 20 }}>{showPassword2 ? <EyeOff /> : <Eye />}</View></TouchableWithoutFeedback>} />
          <View style={{ width: '100%', }}>
            <Text style={{ fontSize: 13, textAlign: 'center', marginTop: 16, marginBottom: 56, ...FONTS['400'] }}>By registering you agree to our<Text style={{ ...FONTS['500'] }}> Terms and Conditions</Text></Text>
          </View>
          <Button children={isLoading ? <Loader /> : "Register"} style={{ width: 182 }} onPress={handleSubmit} />
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={{ fontSize: 14, gap: 16, marginBottom: 10, marginTop: 8, ...FONTS['700'] }}>Login</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Image source={require("../../assets/Facebook.png")} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/Google.png")} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/Apple.png")} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default Register;