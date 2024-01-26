import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import IconsPack from '../assets/icons/IconsPack';
import { default as customTheme } from '../constants/app-theme.json';
import { default as customMapping } from '../constants/mapping.json';
import { i18n } from '../translations';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Thin100': require('./../assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Light300': require('./../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular400': require('./../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium500': require('./../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold700': require('./../assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    const checkLang = async () => {
      if (fontsLoaded && !fontError) {
        const langExists = await AsyncStorage.getItem('lang');
        i18n.locale = langExists || 'en';
        await SplashScreen.hideAsync();
      }
    };
    checkLang();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <IconRegistry icons={[IconsPack, EvaIconsPack]} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...customTheme }}
        customMapping={{ ...eva.mapping, ...customMapping }}>
        <StatusBar barStyle={'dark-content'} />
        <Slot />
        <Toast />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
