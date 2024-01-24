import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react';
import { db } from '../utlils/firebase';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [address, setAddress] = useState("")
  const [language, setLanguage] = useState("")
  const [location, setLocation] = useState({})
  const [restaurent, setRestaurents] = useState([])

  const getUserData = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const userId = await AsyncStorage.getItem('userId');
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          let userData = userDocSnap.data();
          userData = {
            ...userData,
            userId: userId,
          };

          return userData;
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error('Error fetching user data:', error);
    },
  });

  return (
    <UserContext.Provider value={{ userData: getUserData?.data, language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

