import { Avatar, Button, Icon, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import React, { memo } from 'react';
import Information from '../../components/Profile/Information';
import { TouchableOpacity } from 'react-native'
import Container from '../../components/Generic/Container';
import VStack from '../../components/Generic/VStack';
import useLayout from '../../hooks/useLayout';
import { Images } from './../../assets/images';
import Content from './../../components/Generic/Content';
import NavigationAction from './../../components/Generic/NavigationAction';
import Navbar from '../../components/Navbar'
import HStack from '../../components/Generic/HStack';
import Text from '../../components/Generic/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import useUserData from '../../hooks/useUserData';

const Profile10 = memo(() => {
  const { top } = useLayout();
  const router = useRouter();
  const styles = useStyleSheet(themedStyles);

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
          <Avatar
            source={Images.avatar.avatar_01}
            style={styles.avatar}
            shape="rounded"
          />
          <Text category="h3" style={{ color: '#E8E9EB' }} marginBottom={10}>
            Philip Schmidt
          </Text>
        </VStack>
        <VStack border={16} mt={10}>
          <Information/>
        </VStack>

        <TouchableOpacity onPress={async () => {
          await AsyncStorage.removeItem('userId');
          while (router.canGoBack()) { // Pop from stack until one element is left
            router.back();
          }
          router.replace('/')
        }}>
          <Text
            style={{ alignSelf: 'center', marginTop: 80, marginBottom: 20 }}
            category="h6"
          >
            Logout
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
    marginTop: -41
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
  content: {
  },
  avatar: {
    width: 96,
    height: 96,
    marginVertical: 16,
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
