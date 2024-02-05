import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { memo, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icons } from '../../assets/icons';
import Container from '../../components/Generic/Container';
import Loader from '../../components/Generic/Loader';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import Navbar from '../../components/Navbar';
import Information from '../../components/Profile/Information';
import useLayout from '../../hooks/useLayout';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { auth, db } from '../../utlils/firebase';
import { generateRandomId } from '../../utlils/generateRandomId';
import { Images } from './../../assets/images';
import Content from './../../components/Generic/Content';

const Profile10 = memo(() => {
  const { top } = useLayout();
  const router = useRouter();
  const themes = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { userData } = useUserData();
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setProfilePicture(userData?.profilePicture ?? null);
  }, []);

  async function uploadImageAsync(uri) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const randomId = generateRandomId(8); // Change the length as needed
      const fileRef = ref(storage, `${randomId}.jpg`);

      const snapshot = await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.log(error);
      throw new Error('Image upload failed');
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        setLoading(true);
        let imageUrl = await uploadImageAsync(result.assets[0].uri);
        const docRef = doc(db, 'users', userData.userId);
        await updateDoc(docRef, {
          profilePicture: imageUrl,
        });
        await queryClient.invalidateQueries({ queryKey: ['userData'] });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Image Updated',
        });
        setProfilePicture(imageUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container style={styles.container}>
      <VStack pt={top + 8} style={styles.header}>
        {/* <TopNavigation
          appearance="control"
          title={'Profile Settings'}
          alignment="center"
          accessoryLeft={<NavigationAction />}
        /> */}
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <VStack itemsCenter style={styles.topContent}>
          <View style={{ position: 'relative' }}>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: -9,
                zIndex: 1000000000,
                padding: 2,
                borderRadius: 200,
                backgroundColor: themes['color-basic-400'],
              }}>
              <TouchableOpacity onPress={() => pickImage()}>
                <Image source={Icons?.pencil} />
              </TouchableOpacity>
            </View>
            {!isLoading &&
              (profilePicture ? (
                <Image style={styles.avatar} source={{ uri: profilePicture }} />
              ) : (
                <Avatar source={Images.avatar.avatar_01} style={styles.avatar} shape="rounded" />
              ))}
            {isLoading && (
              <View style={styles.avatar2}>
                <Loader />
              </View>
            )}
          </View>
        </VStack>
        <VStack border={16} mt={10}>
          <Information />
        </VStack>

        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            while (router.canGoBack()) {
              router.back();
            }
            await signOut(auth);
            router.replace('/');
          }}>
          <Text style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} category="h6">
            {i18n.t('logout')}
          </Text>
        </TouchableOpacity>
      </Content>
      <Navbar />
    </Container>
  );
});

export default Profile10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    marginTop: -41,
  },
  cover: {
    width: 387,
    height: 517,
  },
  button: {
    padding: 4,
    borderRadius: 12,
  },
  caret: {
    width: 36,
    height: 36,
    tintColor: 'text-black-color',
  },
  buttonCaret: {
    padding: 12,
    backgroundColor: 'color-warning-default',
    borderRadius: 12,
  },
  exp: {
    height: 250,
    padding: 16,
    margin: 4,
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
  },
  header: {
    backgroundColor: '#3D195B',
  },
  topContent: {
    backgroundColor: '#3D195B',
    paddingVertical: 32,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {},
  avatar: {
    width: 96,
    height: 96,
    marginVertical: 16,
    borderRadius: 13,
  },
  avatar2: {
    marginVertical: 16,
    width: 90,
    height: 96,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757575',
  },
  button2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'background-basic-color-2',
    borderRadius: 16,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: 'text-basic-color',
  },
  caret: {
    width: 28,
    height: 28,
    tintColor: 'text-platinum-color',
  },
  contentProgress: {
    marginLeft: 16,
  },
});
