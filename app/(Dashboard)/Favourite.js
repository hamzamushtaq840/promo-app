import { Button, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components'
import React from 'react'
import { Animated, FlatList } from 'react-native'
import ProductItem from '../../components/Cart/ProductItem'
import Container from '../../components/Generic/Container'
import Content from '../../components/Generic/Content'
import HStack from '../../components/Generic/HStack'
import NavigationAction from '../../components/Generic/NavigationAction'
import Text from '../../components/Generic/Text'
import VStack from '../../components/Generic/VStack'
import Navbar from '../../components/Navbar'
import useLayout from '../../hooks/useLayout'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

export const data_products = [
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    name: 'Ice Cream Jolibee',
    min_amount: 2.34,
    rate: 4,
    max_amount: 76,
    sales: 38,
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
];

const Favourite = () => {
  const { width, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [selected, setSelected] = React.useState(0);
  const router = useRouter()

  const renderProduct = React.useCallback(({ item }) => {
    return <ProductItem item={item} style={styles.productItem} />;
  }, []);

  return (
    <Container style={{
      flex: 1,
      paddingBottom: 0,
    }}>
      <TopNavigation
        alignment="center"
        title={<Text fontWeight="bold">Favorite</Text>}
        accessoryLeft={<NavigationAction marginRight={20} height={16} width={20} icon="back" onPress={() => { router.back(); }} />}
        accessoryRight={<NavigationAction marginHorizontal={6} height={20} width={16} icon="notifications" onPress={() => { console.log("notification"); }} />}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          data={data_products}
          renderItem={renderProduct}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, alignSelf: "end" }}>
        <Navbar />
      </View>
    </Container >
  )
}

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
    marginTop: 10
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


export default Favourite