import { useQuery } from '@tanstack/react-query';
import { Button, Input, TopNavigation } from '@ui-kitten/components';
import { addDays, endOfWeek, startOfWeek } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import Loader from '../../components/Generic/Loader';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import ProductItem from '../../components/Home/ProductItem';
import Navbar from '../../components/Navbar';
import { ScratchCard } from '../../components/ScratchCard/ScratchCard';
import { FONTS } from '../../constants/theme';
import useLayout from '../../hooks/useLayout';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import { dateConverter } from '../../utlils/timeConverter';
import useUserData from '../../hooks/useUserData';
import Skeleton from '../../components/Home/Skeleton';
import NoData from '../../components/Home/NoData';

const SingleCategory = () => {
  const router = useRouter();
  const { setAllPromos } = useUserData();
  const params = useLocalSearchParams();
  const data = JSON.parse(params.category);
  const categoryLanguage = i18n.locale;
  const categoryName = data?.dbName;
  const [search, setSearch] = useState('');

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

  const activePromo = useQuery({
    queryKey: ['activePromo', categoryName],
    queryFn: async () => {
      try {
        const currentDate = new Date();
        const startOfWeekDate = startOfWeek(currentDate);
        const endOfWeekDate = endOfWeek(currentDate);

        const promoQuery = query(
          collectionGroup(db, 'promo'),
          where('category', '==', categoryName),
          where('isActive', '==', true),
          where('endDate', '<', endOfWeekDate)
        );

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];
        for (const promoDoc of promoSnapshot.docs) {
          const parentId = promoDoc.ref.parent.parent.id;
          const parentDoc = await getDoc(promoDoc.ref.parent.parent);
          const parentData = parentDoc.exists() ? parentDoc.data() : null;
          const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

          const promoStartDate = new Date(dateConverter(promoData?.startDate).inputFormat);
          if (promoStartDate >= startOfWeekDate) {
            promos.push(promoData);
          }
        }
        return promos || [];
      } catch (error) {
        throw new Error('Error fetching active promos');
      }
    },
    onError: error => {
      console.error('Error fetching active promos:', error);
    },
  });

  const endingSoonPromo = useQuery({
    queryKey: ['endingSoonPromo', categoryName],
    queryFn: async () => {
      try {
        const currentDate = new Date();
        const endDateLimit = addDays(currentDate, 5);

        const promoQuery = query(
          collectionGroup(db, 'promo'),
          where('category', '==', categoryName),
          where('isActive', '==', true),
          where('endDate', '>', currentDate)
        );

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];

        for (const promoDoc of promoSnapshot.docs) {
          const parentId = promoDoc.ref.parent.parent.id;
          const parentDoc = await getDoc(promoDoc.ref.parent.parent);
          const parentData = parentDoc.exists() ? parentDoc.data() : null;
          const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

          promos.push(promoData);
        }

        // Filter promos based on endDate in JavaScript
        const filteredPromos = promos.filter(promo => {
          const promoEndDate = new Date(dateConverter(promo.endDate).inputFormat);
          return promoEndDate > currentDate && promoEndDate <= endDateLimit;
        });

        return filteredPromos || [];
      } catch (error) {
        console.error('Error fetching active promos:', error);
        throw new Error('Error fetching active promos');
      }
    },
    onError: error => {
      console.error('Error fetching active promos:', error);
    },
  });

  const randomPromo = useQuery({
    queryKey: ['randomPromos', categoryName],
    queryFn: async () => {
      try {
        // Generate a random value for ordering
        const randomOrderValue = Math.random();
        // Query to get almost 10 random promos
        const promoQuery = query(
          collectionGroup(db, 'promo'),
          where('random', '>=', randomOrderValue),
          where('category', '==', categoryName),
          where('isActive', '==', true),
          limit(5)
        );

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];
        for (const promoDoc of promoSnapshot.docs) {
          const parentId = promoDoc.ref.parent.parent.id;
          const parentDoc = await getDoc(promoDoc.ref.parent.parent);
          const parentData = parentDoc.exists() ? parentDoc.data() : null;
          const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

          const currentDate = new Date();
          const promoStartDate = new Date(dateConverter(promoData.startDate).inputFormat);
          const promoEndDate = new Date(dateConverter(promoData.endDate).inputFormat);

          if (promoStartDate <= currentDate && promoEndDate > currentDate) {
            promos.push(promoData);
          }
        }
        return promos || []; // Return almost 10 promos
      } catch (error) {
        console.error('Error fetching random promos:', error);
        throw new Error('Error fetching random promos');
      }
    },
    onError: error => {
      console.error('Error fetching random promos:', error);
    },
    refetchInterval: 10000000,
    staleTime: Infinity,
  });

  const flashDealPromo = useQuery({
    queryKey: ['flashDealPromo', categoryName],
    queryFn: async () => {
      try {
        const currentDate = new Date();

        const promoQuery = query(
          collectionGroup(db, 'promo'),
          where('category', '==', categoryName),
          where('isActive', '==', true),
          where('isFlashDeal', '==', true),
          where('endDate', '>', currentDate)
        );

        const promoSnapshot = await getDocs(promoQuery);
        const promos = [];
        for (const promoDoc of promoSnapshot.docs) {
          const parentId = promoDoc.ref.parent.parent.id;
          const parentDoc = await getDoc(promoDoc.ref.parent.parent);
          const parentData = parentDoc.exists() ? parentDoc.data() : null;
          const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

          const promoStartDate = new Date(dateConverter(promoData?.startDate).inputFormat);
          if (promoStartDate <= currentDate) {
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
    return (
      <ProductItem
        onPress={() => {
          // only do if clickTracker is true
          if (item?.clickTracker) handleCounter(item);
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
        {/* search bar  */}
        <VStack padder border={10}>
          <Input
            placeholder={i18n.t('search')}
            accessoryLeft={
              <Image
                source={require('./../../assets/icons/search.png')}
                marginHorizontal={10}
                style={{ width: 10, height: 10 }}
              />
            }
            style={styles.userInput}
          />
        </VStack>

        {search === '' && (
          <View>
            {/* list of deals of the week */}
            {(activePromo?.data?.length > 0 || activePromo.isLoading) && (
              <VStack gap={12} mt={20}>
                <View
                  style={{
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400', ...FONTS['300'] }}>
                    {i18n.t('listWeek')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '(Dashboard)/AllPromos',
                        params: {
                          item: JSON.stringify({
                            category: data?.name[categoryLanguage],
                            name: i18n.t('listWeek'),
                          }),
                        },
                      });
                      setAllPromos(activePromo?.data);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular400',
                        color: '#959597',
                        ...FONTS['500'],
                      }}>
                      {i18n.t('seeAll')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {
                  <FlatList
                    data={activePromo?.data || []}
                    renderItem={renderProduct}
                    horizontal
                    scrollEventThrottle={16}
                    keyExtractor={(i, _index) => `${_index}`}
                    style={{ flexGrow: 0 }}
                    snapToInterval={288}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    pagingEnabled={false}
                    contentContainerStyle={styles.contentProduct}
                  />
                }
              </VStack>
            )}

            {activePromo?.isLoading && <Skeleton />}

            {/* list of flash deals */}
            {(flashDealPromo?.data?.length > 0 || flashDealPromo.isLoading) && (
              <VStack gap={12} mt={20}>
                <View
                  style={{
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400', ...FONTS['300'] }}>
                    {i18n.t('flashDeals')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '(Dashboard)/AllPromos',
                        params: {
                          item: JSON.stringify({
                            category: data?.name[categoryLanguage],
                            name: i18n.t('flashDeals'),
                          }),
                        },
                      });
                      setAllPromos(flashDealPromo?.data);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular400',
                        color: '#959597',
                        ...FONTS['500'],
                      }}>
                      {i18n.t('seeAll')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {
                  <FlatList
                    data={flashDealPromo?.data || []}
                    renderItem={renderProduct}
                    horizontal
                    scrollEventThrottle={16}
                    keyExtractor={(i, _index) => `${_index}`}
                    style={{ flexGrow: 0 }}
                    snapToInterval={288}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    pagingEnabled={false}
                    contentContainerStyle={styles.contentProduct}
                  />
                }
              </VStack>
            )}
            {flashDealPromo?.isLoading && <Skeleton />}

            {/* Ending soon promos */}
            {(endingSoonPromo?.data?.length > 0 || endingSoonPromo.isLoading) && (
              <VStack gap={12} mt={20}>
                <View
                  style={{
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400', ...FONTS['300'] }}>
                    {i18n.t('endingSoon')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '(Dashboard)/AllPromos',
                        params: {
                          item: JSON.stringify({
                            category: data?.name[categoryLanguage],
                            name: i18n.t('endingSoon'),
                          }),
                        },
                      });
                      setAllPromos(endingSoonPromo?.data);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular400',
                        color: '#959597',
                        ...FONTS['500'],
                      }}>
                      {i18n.t('seeAll')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {
                  <FlatList
                    data={endingSoonPromo?.data || []}
                    renderItem={renderProduct}
                    horizontal
                    scrollEventThrottle={16}
                    keyExtractor={(i, _index) => `${_index}`}
                    style={{ flexGrow: 0 }}
                    snapToInterval={288}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    pagingEnabled={false}
                    contentContainerStyle={styles.contentProduct}
                  />
                }
              </VStack>
            )}
            {endingSoonPromo?.isLoading && <Skeleton />}

            {/* Random promos */}
            {(randomPromo?.data?.length > 0 || randomPromo.isLoading) && (
              <VStack gap={12} mt={20}>
                <View
                  style={{
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400', ...FONTS['300'] }}>
                    {i18n.t('randomPromos')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '(Dashboard)/AllPromos',
                        params: {
                          item: JSON.stringify({
                            category: data?.name[categoryLanguage],
                            name: i18n.t('randomPromos'),
                          }),
                        },
                      });
                      setAllPromos(randomPromo?.data);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Roboto-Regular400',
                        color: '#959597',
                        ...FONTS['500'],
                      }}>
                      {i18n.t('seeAll')}
                    </Text>
                  </TouchableOpacity>
                </View>
                {
                  <FlatList
                    data={randomPromo?.data || []}
                    renderItem={renderProduct}
                    horizontal
                    scrollEventThrottle={16}
                    keyExtractor={(i, _index) => `${_index}`}
                    style={{ flexGrow: 0 }}
                    snapToInterval={288}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    pagingEnabled={false}
                    contentContainerStyle={styles.contentProduct}
                  />
                }
              </VStack>
            )}

            {randomPromo?.isLoading && <Skeleton />}
          </View>
        )}
        {randomPromo?.data?.length === 0 &&
          flashDealPromo?.data?.length === 0 &&
          endingSoonPromo?.data?.length === 0 &&
          activePromo?.data?.length === 0 && <NoData />}

        {/* {search !== '' && (
          <View>
            <Text>Searching</Text>
          </View>
        )} */}
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

// 2.list of the week - where promo isactive and datestart and is< today and in this week

// 3.list of random promo - random where promo is active

// 4.list of promo ending soon - where expiry date is today + 5 days

// 5.list of images for the slider - from images in table appsetting in db

// 6.Search if we decide to put the search on the home page @hamza_mushtaq what do you think? should it be like it is in the design or another screen? can you manage the home view and search view in the same screen?

// 7.Wheel and scratch card section
