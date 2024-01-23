import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Text from '../components/Generic/Text';
import useLayout from './../hooks/useLayout';

const TabBar = ({ style, activeIndex, onChange, tabs }) => {
  const theme = useTheme();
  const AniButton = Animated.createAnimatedComponent(TouchableOpacity);
  const { width } = useLayout();
  const refScrollView = React.useRef(null);

  const changeIndex = React.useCallback(
    (i) => {
      return onChange(i);
    },
    [activeIndex],
  );

  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 120 + 8 - (width - 250) / 2,
      animated: true,
    });
  }, [activeIndex]);

  return (
    <View >
      <ScrollView
        contentContainerStyle={[styles.container, style]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}>
        {tabs.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <AniButton
              key={index}
              style={[
                styles.btn,
                {
                  borderColor: theme['background-basic-color-2'],
                  backgroundColor: isActive
                    ? theme['color-primary-default']
                    : theme['background-basic-color-2'],
                  color: isActive
                    ? '#ffffff'
                    : 'red',
                  alignItems: 'center',
                },
              ]}
              onPress={() => changeIndex(index)}
              activeOpacity={0.7}>
              <Image source={require('./../assets/icons/cup.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ color: isActive ? '#ffffff' : '#959597', fontFamily: 'Roboto-Medium500', paddingTop: 4 }} category="s1" >
                {item}
              </Text>
            </AniButton>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 14,
  },
  btn: {
    marginRight: 8,
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
  },
});
