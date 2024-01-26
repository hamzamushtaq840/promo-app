import { useQuery } from '@tanstack/react-query';
import { StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { collectionGroup, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import ProductItem from '../../components/Cart/ProductItem';
import Container from '../../components/Generic/Container';
import Loader from '../../components/Generic/Loader';
import NavigationAction from '../../components/Generic/NavigationAction';
import Text from '../../components/Generic/Text';
import Navbar from '../../components/Navbar';
import { FONTS } from '../../constants/theme';
import useLayout from '../../hooks/useLayout';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';

const Home = () => {
  const { width, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selected, setSelected] = React.useState(0);
  const router = useRouter();
  const { userData } = useUserData();

  const bookingQuery = useQuery({
    queryKey: ['bookings', userData?.bookings],
    queryFn: async () => {
      try {
        const favourites = userData?.bookings || [];

        const promoQuery = query(collectionGroup(db, 'promo'));

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];

        // Fetching promos and adding parentId field and parentData
        for (const promoDoc of promoSnapshot.docs) {
          // Filter based on the 'id' field
          if (favourites?.includes(promoDoc.id)) {
            const parentId = promoDoc.ref.parent.parent.id;
            const parentDoc = await getDoc(promoDoc.ref.parent.parent);

            // Include additional data from the parent document
            const parentData = parentDoc.exists() ? parentDoc.data() : null;

            const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };
            promos.push(promoData);
          }
        }
        return promos || [];
      } catch (error) {
        console.error('Error fetching active promos:', error);
        throw new Error('Error fetching active promos');
      }
    },
    onError: error => {
      console.error('Error fetching active promos:', error);
    },
  });

  const renderProduct = React.useCallback(({ item }) => {
    return <ProductItem item={item} style={styles.productItem} />;
  }, []);

  return (
    <Container
      style={{
        flex: 1,
        paddingBottom: 0,
      }}>
      <TopNavigation
        alignment="center"
        title={<Text fontWeight="bold">{i18n.t('bookings')}</Text>}
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
      />
      {bookingQuery?.data?.length > 0 ? (
        <FlatList
          data={bookingQuery?.data}
          renderItem={renderProduct}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {bookingQuery.isLoading ? (
            <Loader status={'primary'} />
          ) : (
            <Text style={{ fontSize: 18, color: '#969695', ...FONTS['500'] }}>
              {i18n.t('noBooking')}
            </Text>
          )}
        </View>
      )}
      <View style={{ position: 'absolute', bottom: 0, alignSelf: 'end' }}>
        <Navbar />
      </View>
    </Container>
  );
};

const DATA = ['Popular', 'Hot Today', 'Near by', 'Favorite', 'Best rate', 'Local'];

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },

  background: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 0,
  },
  userInput: {
    flex: 1,
    borderRadius: 16,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 24,
  },
  buttonLogin: {
    flex: 1,
    marginRight: 8,
  },
  contentProduct: {
    paddingLeft: 14,
  },
  itemProduct: {
    marginRight: 8,
  },
  contentContainerStyle: {
    paddingBottom: 0,
  },
  productItem: {
    marginBottom: 10,
  },
});

export default Home;
