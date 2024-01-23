import { Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import Container from '../../components/Generic/Container'
import VStack from '../../components/Generic/VStack'
import ProductItem from '../../components/Home/ProductItem'
import Navbar from '../../components/Navbar'
import useLayout from '../../hooks/useLayout'
import { Images } from './../../assets/images'
import Content from './../../components/Generic/Content'
import NavigationAction from './../../components/Generic/NavigationAction'
import TabBarScrollable from './../../elements/TabBarScrollable'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Dots from '../../components/Home/Dots'
import { db } from '../../utlils/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import HStack from '../../components/Generic/HStack'
import { FONTS } from '../../constants/theme';
import Loader from '../../components/Generic/Loader'

export const data_products = [
  {
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    name: 'Taquito Cheese',
    amount: 8.99,
    rate: 3,
  },
  {
    image:
      'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    name: 'Chalupa Supreme',
    amount: 5.22,
    rate: 4,
  },
  {
    image:
      'https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    name: 'Chalupa Supreme',
    amount: 5.22,
    rate: 4,
  },
  {
    image:
      'https://user-images.githubusercontent.com/42206067/227762650-e4073f34-08f7-4ebd-9d15-a20c9edfb88f.png',
    name: 'Taquito Cheese',
    amount: 8.99,
    rate: 3,
  },
  {
    image:
      'https://user-images.githubusercontent.com/42206067/227762652-82737b9b-afc3-4820-8a9c-2997c668170f.png',
    name: 'Chalupa Supreme',
    amount: 5.22,
    rate: 4,
  },
  {
    image:
      'https://user-images.githubusercontent.com/42206067/227762650-e4073f34-08f7-4ebd-9d15-a20c9edfb88f.png',
    name: 'Taquito Cheese',
    amount: 8.99,
    rate: 3,
  },
];

export const data_images = [
  Images.home.banner,
  Images.home.banner2,
  Images.home.banner3,
  Images.home.banner4,
];

const Home = () => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const router = useRouter()
  const translationX = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const refScroll = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isAutoSliding, setIsAutoSliding] = React.useState(true);
  const categoryLanguage = 'en'
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });
  const [numImages, setNumImages] = React.useState(0);
  const autoSlideDelay = 3000; // 3 seconds delay for auto-sliding

  const goToNextSlide = () => {
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
      if (prevIndex === numImages - 1) { // assuming your array is 0-indexed
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
  const onScrollEnd = React.useCallback((event) => {
    // // Clear auto-sliding when the user manually swipes
    setIsAutoSliding(false);

  }, [width, autoSlideDelay]);

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
        categoriesSnapshot.forEach((doc) => {
          categories2 = doc.data()
        });
        return (categories2.categories);
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onError: (error) => {
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
        categoriesSnapshot.forEach((doc) => {
          images2 = doc.data().Images
          // images2.push({ id: doc.id, ...doc.data() });
        });
        setNumImages(images2.length)
        return (images2);
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onError: (error) => {
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

  return (
    <Container style={{
      flex: 1,
    }}>
      <TopNavigation
        alignment="center"
        title={<Text>Home</Text>}
        accessoryRight={<NavigationAction marginHorizontal={6} height={20} width={16} icon="notifications" onPress={() => { console.log("notification"); }} />}
      />
      <Content contentContainerStyle={styles.content}>
        <VStack padder border={10}>
          <Input
            placeholder={'Search'}
            accessoryLeft={<Image source={require('./../../assets/icons/search.png')} marginHorizontal={10} style={{ width: 10, height: 10 }} />}
            style={styles.userInput}
          />
        </VStack>
        {/* <TabBarScrollable tabs={DATA} activeIndex={selected} onChange={setSelected} style={styles.tabBar} /> */}
        {/* <View style={{ paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15 }}>
          <TouchableOpacity onPress={() => {
            router.push('(Dashboard)/SpinWheel')
          }}>
            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular400', color: '#959597' }}>{`Try your luck >`}</Text>
          </TouchableOpacity>
        </View> */}


        <VStack mt={20}>
          {images.isLoading === false && images?.data.length > 0 && <Animated.FlatList
            data={images?.data}
            scrollEventThrottle={16}
            renderItem={renderItem}
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToInterval={width}
            bounces={false}
            pagingEnabled={false}
            decelerationRate="fast"
            onScroll={scrollHandler}
            style={{ width: width }}
            onScrollEndDrag={(event) => onScrollEnd(event)}
          />}
          {images.isLoading === false && images?.data.length > 0 &&  <View style={styles.row}>
            <Dots translationX={translationX} data={images?.data} />
          </View>}
        </VStack>
        <Text category="h4" style={{ fontSize: 20, paddingHorizontal: 16, marginTop: 10, ...FONTS['700'] }} >Our Categories</Text>
        {categories?.isLoading && <Loader status={'primary'} center mt={40} />}
        {!categories?.isLoading && <HStack wrap mt={24} pb={40}>
          {categories?.data?.map((food, index) => {
            return (
              <VStack key={index} style={{ width: (width - 20) / 3 }} itemsCenter mb={24}>
                <TouchableOpacity onPress={() => {
                  router.push({ pathname: `SingleCategory`, params: { category: JSON.stringify(food) } })
                }}>
                  <Image source={{ uri: food.url }} style={{ width: 60, height: 60 }} />
                  <Text style={{ textAlign: 'center', fontSize: 15, ...FONTS['500'] }} >
                    {food.name[categoryLanguage]}
                  </Text>
                </TouchableOpacity>
              </VStack>
            );
          })}
        </HStack>}

        {/* <VStack gap={12} mt={20}>
          <View style={{ paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular400' }}>List of deals of the week</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Regular400', color: '#959597' }}>See all</Text>
          </View>
          <FlatList
            data={data_products || []}
            renderItem={renderProduct}
            horizontal
            scrollEventThrottle={16}
            keyExtractor={(i, _index) => `${_index}`}
            style={{ flexGrow: 0 }}
            snapToInterval={(width - 104) + 8}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            pagingEnabled={false}
            contentContainerStyle={styles.contentProduct}
          />
        </VStack>
        <VStack gap={12} mt={20}>
          <View style={{ paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 400 }}>Promo by category</Text>
            <Text style={{ fontSize: 14, fontWeight: 400, color: '#959597' }}>See all</Text>
          </View>
          <FlatList
            data={data_products || []}
            renderItem={renderProduct}
            horizontal
            scrollEventThrottle={16}
            keyExtractor={(i, _index) => `${_index}`}
            style={{ flexGrow: 0 }}
            snapToInterval={(width - 104) + 8}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            pagingEnabled={false}
            contentContainerStyle={styles.contentProduct}
          />
        </VStack> */}
      </Content>
      <Navbar />
    </Container>
  )
}

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
    height: 220,
  },
  image: {
    width: '100%',
    height: 220,
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


export default Home