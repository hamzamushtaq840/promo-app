import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { db } from '../utlils/firebase';

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState({});
  const [restaurent, setRestaurents] = useState([]);
  const [data, setData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allPromos, setAllPromos] = useState([]);

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
    onSuccess: data => {
      return data;
    },
    onError: error => {
      console.error('Error fetching user data:', error);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const docRef = query(collection(db, 'notifications'), where('userId', '==', userId));

        const unsubscribe = onSnapshot(docRef, snapshot => {
          snapshot.docChanges().forEach(change => {
            const doc = change.doc;

            if (doc && doc.exists()) {
              const userData = doc.data();
              const notifications = userData?.allNotifications;
              setNotifications(notifications);
              console.log('Notifications changed ', notifications);
              // Do something with the updated notifications array
            } else {
              console.log('Document does not exist');
            }
          });
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: getUserData?.data,
        language,
        setLanguage,
        notifications,
        setAllPromos,
        allPromos,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
