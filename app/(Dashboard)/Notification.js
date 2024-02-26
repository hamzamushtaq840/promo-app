import { StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { FlatList } from 'react-native';
import Container from '../../components/Generic/Container';
import HStack from '../../components/Generic/HStack';
import NavigationAction from '../../components/Generic/NavigationAction';
import Text from '../../components/Generic/Text';
import VStack from '../../components/Generic/VStack';
import useLayout from '../../hooks/useLayout';
import useUserData from '../../hooks/useUserData';
// import keyExtractoUtil from './../src/utils/keyExtractoUtil';

const Social14 = memo(() => {
  const router = useRouter();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { notifications } = useUserData();

  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title={'Notifications'}
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
      <FlatList
        data={[1, 2, 3]}
        // data={notifications}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => {
          return (
            <HStack
              level="2"
              opacity={1}
              justify="flex-start"
              gap={16}
              padding={16}
              mb={8}
              border={16}
              itemsCenter>
              <VStack style={[styles.layoutIcon, { backgroundColor: '#106AF3' }]}>
                {/* <Icon pack="assets" name="money" /> */}
              </VStack>
              <VStack gap={4}>
                <Text category="h5" maxWidth={259 * (width / 375)}>
                  Have you checked todays promos !
                </Text>
                <Text category="c1">{/* {item.time} */}30 mins ago</Text>
              </VStack>
            </HStack>
          );
        }}
      />
    </Container>
  );
});

export default Social14;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'text-basic-color',
  },
  iconChevron: {
    width: 32,
    height: 32,
    tintColor: 'text-basic-color',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  layoutIcon: {
    borderRadius: 99,
    padding: 16,
  },
});
const example_data = [
  {
    color: '#106AF3',
    title: 'You have added $200 to your "future" accumulation goal',
    time: '30 mins ago',
    readed: false,
  },
  {
    color: '#00CD50',
    title: 'You have completed your goal of saving $20,000 to rent a house in 2023',
    time: '10/10/2022 17:04',
    readed: false,
  },
  {
    color: '#B1CEDE',
    title: 'Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023',
    time: '10/10/2022 17:04',
    readed: false,
  },
  {
    color: '#106AF3',
    title: 'Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023',
    time: '10/10/2022 17:04',
    readed: true,
  },
  {
    color: '#106AF3',
    title: 'Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023',
    time: '10/10/2022 17:04',
    readed: true,
  },
  {
    color: '#00CD50',
    title: 'Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023',
    time: '10/10/2022 17:04',
    readed: true,
  },
];
