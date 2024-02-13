import { StyleService, Text, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddCard from '../../components/Fidelity/AddCard';
import AllFidelityCards from '../../components/Fidelity/AllFidelityCards';
import NoCard from '../../components/Fidelity/NoCard';
import Container from '../../components/Generic/Container';
import Navbar from '../../components/Navbar';
import useUserData from '../../hooks/useUserData';
import Add from '../../svg/Add';
import { i18n } from '../../translations';
import NavigationAction from './../../components/Generic/NavigationAction';

const FidelityCard = () => {
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();
  const { userData } = useUserData();
  const [modal, setModal] = React.useState(false);
  const [current, setCurrent] = useState('3rdPartyCards');

  // const logout = async () => {
  //   await AsyncStorage.removeItem('userId');
  //   await signOut(auth);
  //   router.replace('/');
  // };

  // useEffect(() => {}, [logout()]);
  return (
    <Container
      style={{
        paddingBottom: 0,
      }}>
      <TopNavigation
        alignment="start"
        title={<Text>{i18n.t('fidelityCards')}</Text>}
        accessoryLeft={
          <NavigationAction
            marginRight={20}
            height={16}
            width={20}
            icon="back"
            onPress={() => {
              router.back();
            }}
          />
        }
        accessoryRight={
          userData?.fidelity.length > 0 &&
          current === '3rdPartyCards' && (
            <View>
              <TouchableOpacity onPress={() => setModal(true)}>
                <Add />
              </TouchableOpacity>
            </View>
          )
        }
      />
      {userData?.fidelity.length === 0 && <NoCard setModal={setModal} />}
      {userData?.fidelity.length > 0 && (
        <AllFidelityCards current={current} setCurrent={setCurrent} setModal={setModal} />
      )}
      {modal && <AddCard setModal={setModal} />}
      <Navbar />
    </Container>
  );
};

export default FidelityCard;

const themedStyles = StyleService.create({
  content: {
    flex: 1,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
