import { useQuery } from '@tanstack/react-query';
import { TopNavigation } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collectionGroup, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import Loader from '../../components/Generic/Loader';
import NavigationAction from '../../components/Generic/NavigationAction';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import ProductItem from '../../components/Home/ProductItem';
import Navbar from '../../components/Navbar';
import useLayout from '../../hooks/useLayout';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';

const SingleCategory = () => {
  const categoryName = 'Food';
  // const currentDate = Timestamp.now();
  const router = useRouter();
  const { width } = useLayout();
  const params = useLocalSearchParams();
  const data = JSON.parse(params.category);
  const categoryLanguage = i18n.locale;

  const activePromo = useQuery({
    queryKey: ['activePromo', categoryName],
    queryFn: async () => {
      try {
        const promoQuery = query(
          collectionGroup(db, 'promo'),
          where('category', '==', categoryName),
          where('isActive', '==', true)
        );

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];

        // Fetching promos and adding parentId field and parentData
        for (const promoDoc of promoSnapshot.docs) {
          const parentId = promoDoc.ref.parent.parent.id;
          const parentDoc = await getDoc(promoDoc.ref.parent.parent);

          // Include additional data from the parent document
          const parentData = parentDoc.exists() ? parentDoc.data() : null;

          const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };
          promos.push(promoData);
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

  const handleCounter = async val => {
    const promoDocRef = doc(db, 'web-users', val.parentId, 'promo', val.id);

    try {
      const promoDocSnapshot = await getDoc(promoDocRef);
      const currentNoOfClicks = promoDocSnapshot.data().noOfClicks || 0;

      // Increment the noOfClicks property and update the document
      await updateDoc(promoDocRef, {
        noOfClicks: currentNoOfClicks + 1,
      });
    } catch (error) {
      console.error('Error incrementing noOfClicks:', error);
    }
  };

  const renderProduct = React.useCallback(({ item }) => {
    return (
      <ProductItem
        onPress={() => {
          handleCounter(item);
          router.push({
            pathname: '(Dashboard)/SingleProductDetail',
            params: { item: JSON.stringify(item) },
          });
        }}
        item={item}
        style={styles.itemProduct}
      />
    );
  }, []);

  return (
    <Container
      style={{
        flex: 1,
        paddingBottom: 0,
      }}>
      <TopNavigation alignment="center" title={<Text>{data?.name[categoryLanguage]}</Text>} />
      <Content contentContainerStyle={styles.content}>
        <VStack gap={12} mt={20}>
          <View
            style={{
              paddingHorizontal: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400' }}>
              {i18n.t('listWeek')}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular400', color: '#959597' }}>
              {i18n.t('seeAll')}
            </Text>
          </View>
          {/* {activePromo.isLoading &} */}
          {activePromo.isLoading && <Loader height={152} status={'primary'} center mt={10} />}
          {
            <FlatList
              data={activePromo?.data || []}
              renderItem={renderProduct}
              horizontal
              scrollEventThrottle={16}
              keyExtractor={(i, _index) => `${_index}`}
              style={{ flexGrow: 0 }}
              snapToInterval={width - 104 + 8}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              pagingEnabled={false}
              contentContainerStyle={styles.contentProduct}
            />
          }
        </VStack>
      </Content>
      <Navbar />
    </Container>
  );
};

export default SingleCategory;

const styles = StyleSheet.create({
  tabBar: {
    paddingRight: 16,
  },
  contentStyle: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 80,
    paddingTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  contentContainerStyle: {
    paddingTop: 16,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 28,
  },
  row: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'row',
  },
  box1: {
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  tabBar: {
    paddingTop: 24,
    paddingRight: 16,
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
});
