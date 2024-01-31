import React from 'react';
import { Text, View } from 'react-native';
import ScratchCard from '../../components/ScratchCard/ScratchCard';
import { StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import Container from '../../components/Generic/Container';
import Content from '../../components/Generic/Content';
import { useRouter } from 'expo-router';
import NavigationAction from '../../components/Generic/NavigationAction';

const ScratchCard2 = () => {
  const styles = useStyleSheet(themedStyles);
  const router = useRouter();

  return (
    <Container
      style={{
        flex: 1,
      }}>
      <TopNavigation
        alignment="center"
        title={<Text>{'Scratch Card'}</Text>}
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
      <Content contentContainerStyle={styles.content}>
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScratchCard />
        </View>
      </Content>
    </Container>
  );
};

export default ScratchCard2;

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
