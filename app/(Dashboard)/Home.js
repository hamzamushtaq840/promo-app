import { useQuery } from '@tanstack/react-query';
import { Button, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { endOfWeek, startOfWeek } from 'date-fns';
import { useRouter } from 'expo-router';
import {
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Container from '../../components/Generic/Container';
import HStack from '../../components/Generic/HStack';
import Loader from '../../components/Generic/Loader';
import VStack from '../../components/Generic/VStack';
import Dots from '../../components/Home/Dots';
import Navbar from '../../components/Navbar';
import { FONTS } from '../../constants/theme';
import useLayout from '../../hooks/useLayout';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import { dateConverter } from '../../utlils/timeConverter';
import Content from './../../components/Generic/Content';
import NavigationAction from './../../components/Generic/NavigationAction';
import { Icons } from '../../assets/icons';

const Home = () => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();
  const translationX = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const refScroll = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isAutoSliding, setIsAutoSliding] = React.useState(true);
  const categoryLanguage = i18n.locale;
  const scrollHandler = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
  });
  const [numImages, setNumImages] = React.useState(0);
  const autoSlideDelay = 3000; // 3 seconds delay for auto-sliding

  const goToNextSlide = () => {
    setIndex(prevIndex => {
      let nextIndex = prevIndex + 1;
      if (prevIndex === numImages - 1) {
        // assuming your array is 0-indexed
        nextIndex = 0;
      }
      scrollRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      return nextIndex;
    });
  };

  React.useEffect(() => {
    let interval;
    if (isAutoSliding && images.isLoading === false) {
      interval = setInterval(() => {
        goToNextSlide();
      }, autoSlideDelay);
    }
    // Cleanup the interval on component unmount or when isAutoSliding changes
    return () => interval && clearInterval(interval);
  }, [isAutoSliding, numImages]);

  // When the user manually swipes the image, stop the auto-sliding and start it after a delay
  const onScrollEnd = React.useCallback(
    event => {
      // // Clear auto-sliding when the user manually swipes
      setIsAutoSliding(false);
    },
    [width, autoSlideDelay]
  );

  React.useEffect(() => {
    scrollRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }, [index]);

  React.useEffect(() => {
    refScroll.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedIndex]);

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const categoriesCollection = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);

        let categories2 = [];
        categoriesSnapshot.forEach(doc => {
          categories2 = doc.data();
        });
        return categories2.categories;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onError: error => {
      console.error('Error fetching user data:', error);
    },
  });

  const images = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      try {
        const imagesCollection = collection(db, 'images');
        const categoriesSnapshot = await getDocs(imagesCollection);

        let images2 = [];
        categoriesSnapshot.forEach(doc => {
          images2 = doc.data().Images;
          // images2.push({ id: doc.id, ...doc.data() });
        });
        setNumImages(images2.length);
        return images2;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onError: error => {
      console.error('Error fetching user data:', error);
    },
  });

  const renderItem = React.useCallback(({ item }) => {
    return (
      <View style={[styles.imageView, { width }]}>
        <Image source={{ uri: item }} resizeMode="cover" style={styles.image} />
      </View>
    );
  }, []);

  // const activePromo = useQuery({
  //   queryKey: ['activePromo'],
  //   queryFn: async () => {
  //     try {
  //       const currentDate = new Date();
  //       const startOfWeekDate = startOfWeek(currentDate);
  //       const endOfWeekDate = endOfWeek(currentDate);

  //       const promoQuery = query(
  //         collectionGroup(db, 'promo'),
  //         where('isActive', '==', true),
  //         where('endDate', '<', endOfWeekDate)
  //       );

  //       const promoSnapshot = await getDocs(promoQuery);
  //       const promos = [];
  //       for (const promoDoc of promoSnapshot.docs) {
  //         const parentId = promoDoc.ref.parent.parent.id;
  //         const parentDoc = await getDoc(promoDoc.ref.parent.parent);
  //         const parentData = parentDoc.exists() ? parentDoc.data() : null;
  //         const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

  //         const promoStartDate = new Date(dateConverter(promoData?.startDate).inputFormat);
  //         if (promoStartDate >= startOfWeekDate) {
  //           promos.push(promoData);
  //         }
  //       }
  //       console.log(promos);
  //       // return promos || [];
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error('Error fetching active promos');
  //     }
  //   },
  //   onError: error => {
  //     console.error('Error fetching active promos:', error);
  //   },
  // });

  // const randomPromo = useQuery({
  //   queryKey: ['randomPromos'],
  //   queryFn: async () => {
  //     try {
  //       // Generate a random value for ordering
  //       const randomOrderValue = Math.random();
  //       // Query to get almost 10 random promos
  //       const promoQuery = query(
  //         collectionGroup(db, 'promo'),
  //         where('random', '>=', randomOrderValue),
  //         where('isActive', '==', true),
  //         limit(5)
  //       );

  //       const promoSnapshot = await getDocs(promoQuery);
  //       const promos = [];
  //       for (const promoDoc of promoSnapshot.docs) {
  //         const parentId = promoDoc.ref.parent.parent.id;
  //         const parentDoc = await getDoc(promoDoc.ref.parent.parent);
  //         const parentData = parentDoc.exists() ? parentDoc.data() : null;
  //         const promoData = { id: promoDoc.id, parentId, parentData, ...promoDoc.data() };

  //         const currentDate = new Date();
  //         const promoStartDate = new Date(dateConverter(promoData.startDate).inputFormat);
  //         const promoEndDate = new Date(dateConverter(promoData.endDate).inputFormat);

  //         if (promoStartDate <= currentDate && promoEndDate > currentDate) {
  //           promos.push(promoData);
  //         }
  //       }
  //       console.log(promos);
  //       return promos || [];
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error('Error fetching random promos');
  //     }
  //   },
  //   onError: error => {
  //     console.error('Error fetching random promos:', error);
  //   },
  //   refetchInterval: 10000000,
  //   staleTime: Infinity,
  // });

  const renderProduct = ({ item }) => {
    return (
      <VStack key={index} style={{ width: (width - 50) / 3 }} itemsCenter mb={10}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `SingleCategory`,
              params: { category: JSON.stringify(item) || [] },
            });
          }}>
          <Image source={{ uri: item?.url }} style={{ width: 60, height: 60 }} />
          <Text style={{ textAlign: 'center', fontSize: 15, ...FONTS['500'] }}>
            {item?.name[categoryLanguage]}
          </Text>
        </TouchableOpacity>
      </VStack>
    );
  };

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <TopNavigation
        alignment="center"
        title={<Text>{i18n.t('home')}</Text>}
        accessoryRight={
          <TouchableOpacity
            onPress={() => {
              router.push('/Notification');
            }}
            style={{ position: 'relative' }}>
            <NavigationAction
              onPress={() => {}}
              marginHorizontal={6}
              height={20}
              width={16}
              icon="notifications"
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: 'red',
                position: 'absolute',
                top: 0,
                right: 4,
                borderRadius: 30,
              }}></View>
          </TouchableOpacity>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <VStack mt={10}>
          {images.isLoading === false && images?.data.length > 0 && (
            <Animated.FlatList
              data={images?.data || []}
              scrollEventThrottle={16}
              snapToInterval={width}
              renderItem={renderItem}
              ref={scrollRef}
              showsHorizontalScrollIndicator={false}
              horizontal
              bounces={false}
              pagingEnabled={false}
              decelerationRate="fast"
              onScroll={scrollHandler}
              onScrollEndDrag={event => onScrollEnd(event)}
            />
          )}
          {images.isLoading === false && images?.data.length > 0 && (
            <View style={styles.row}>
              <Dots translationX={translationX} data={images?.data} />
            </View>
          )}
        </VStack>
        <Text
          category="h4"
          style={{ fontSize: 20, paddingHorizontal: 16, marginTop: 10, ...FONTS['700'] }}>
          {i18n.t('ourCategories')}
        </Text>
        {categories?.isLoading && <Loader status={'primary'} center mt={40} />}
        <View style={{ marginVertical: 20 }}>
          {!categories?.isLoading && categories?.data?.length > 0 && (
            <FlatList
              data={categories?.data || []}
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
          )}
        </View>
        <Text category="h4" style={{ fontSize: 20, paddingHorizontal: 16, ...FONTS['700'] }}>
          Get a chance to win
        </Text>
        <HStack justify="flex-start" ml={5}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => router.push('/ScratchCard2')}>
            <Image
              source={Icons.scratch}
              style={{ width: 50, height: 50, marginHorizontal: 25, marginTop: 20 }}
            />
            <Text style={{ textAlign: 'center', fontSize: 15, ...FONTS['500'] }}>Scratch Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => router.push('/SpinWheel')}>
            <Image
              source={Icons.wheel}
              style={{ width: 50, height: 50, marginHorizontal: 25, marginTop: 20 }}
            />
            <Text style={{ textAlign: 'center', fontSize: 15, ...FONTS['500'] }}>Wheel</Text>
          </TouchableOpacity>
        </HStack>
      </Content>
      <Navbar />
    </Container>
  );
};

const DATA = ['Popular', 'Hot Today', 'Near by', 'Favorite', 'Best rate', 'Local'];

const themedStyles = StyleService.create({
  contentContainerStyle: {
    paddingTop: 16,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    height: 320,
  },
  image: {
    width: '100%',
    height: 320,
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
  itemProduct: {
    marginRight: 8,
  },
});

export default Home;

// List of functions cards shown on first home page>
// 1.list of categories
// 2.list of the week - where promo isactive and datestart and is< today and in this week
// 3.list of random promo - random where promo is active
// 4.list of promo ending soon - where expiry date is today + 5 days
// 6.Search if we decide to put the search on the home page @hamza_mushtaq what do you think? should it be like it is in the design or another screen? can you manage the home view and search view in the same screen?
// 7.Wheel and scratch card section
// 5.list of images for the slider - from images in table appsetting in db
