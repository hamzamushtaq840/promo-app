import { TopNavigation } from '@ui-kitten/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import HStack from '../../components/Generic/HStack';
import ProductItem from '../../components/Home/ProductItem';
import Navbar from '../../components/Navbar';
import useLayout from '../../hooks/useLayout';
import useUserData from '../../hooks/useUserData';
import { i18n } from '../../translations';
import { db } from '../../utlils/firebase';
import ProductItemAll from '../../components/Home/ProductItemAll';
import { FONTS } from '../../constants/theme';
import NavigationAction from '../../components/Generic/NavigationAction';

const SingleCategory = () => {
  const router = useRouter();
  const { width } = useLayout();
  const { allPromos } = useUserData();
  const params = useLocalSearchParams();
  const item2 = JSON.parse(params.item);

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
      <ProductItemAll
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
      <TopNavigation
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
        alignment="center"
        title={item2?.category}
      />
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Roboto-Regular400',
          ...FONTS['300'],
          paddingHorizontal: 16,
          marginBottom: 15,
        }}>
        {item2?.name}
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={allPromos}
          renderItem={renderProduct}
          scrollEventThrottle={16}
          keyExtractor={(i, _index) => `${_index}`}
          style={{ flexGrow: 0 }}
          snapToInterval={152 + 15}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled={false}
          contentContainerStyle={{
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
      {/* <SpinWheel /> */}
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

  container: {
    flex: 1,
    paddingBottom: 0,
  },

  contentProduct: {
    width: '100%',
    backgroundColor: 'red',
  },
  itemProduct: {},
});
