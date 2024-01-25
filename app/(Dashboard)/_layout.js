import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React from 'react';
import Navbar from '../../components/Navbar';
import { UserProvider } from '../../context/dataContext';

const queryClient = new QueryClient();

const _layout = () => {
  // const [showPage, setShowPage] = React.useState(false)

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const isLoggedIn = await AsyncStorage.getItem('login');
  //       const shouldSave = await AsyncStorage.getItem('rememberMe');
  //       if (!isLoggedIn && !shouldSave) {
  //         BackHandler.exitApp();
  //       }
  //     } catch (error) {
  //       console.error('Error occurred:', error);
  //     }
  //     finally {
  //       setShowPage(true)
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (!showPage) {
  //   return <Container style={{ flex: 1 }} ></Container>
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* <Container style={{ flex: 1 }}>
        <View style={{ flex: 1 }}> */}
        <Slot />
        {/* </View> */}
        {/* </Container> */}
      </UserProvider>
    </QueryClientProvider>
  );
};

export default _layout;
