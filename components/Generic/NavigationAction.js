import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';

const NavigationAction = memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    icon,
    title,
    height = 24,
    width = 24,
    titleStatus,
    borderRadius = 99,
    disabled,
    style,
    borderWidth,
    status = 'basic',
  }) => {
    const themes = useTheme();

    const router = useRouter();
    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        router.back();
      }
    }, [onPress]);

    const getBackground = React.useCallback(() => {
      switch (status) {
        case 'basic':
          return 'transparent';
        case 'primary':
          return themes['color-primary-default'];
        case 'placeholder':
          return themes['background-basic-color-2'];
        case 'warning-fill':
          return themes['color-warning-default'];
        default:
          return 'transparent';
      }
    }, [status]);
    const getStatus = React.useCallback(() => {
      switch (status) {
        case 'basic':
          return themes['text-basic-color'];
        case 'primary':
          return themes['text-info-color'];
        case 'warning-fill':
          return themes['text-primary-color'];
        case 'white':
          return themes['text-white-color'];
        case 'warning':
          return themes['color-warning-500'];
        default:
          return themes['text-basic-color'];
      }
    }, [status]);

    return title ? (
      <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={_onPress}>
        <Text category="h5" status={titleStatus}>
          {title}
        </Text>
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          style,
          {
            borderRadius: borderRadius,
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            borderWidth: borderWidth ? borderWidth : 0,
            borderColor: getStatus(),
            backgroundColor: getBackground(),
            height: height,
            width: width,
          },
        ]}
        icon={props => (
          <Icon
            {...props}
            pack="assets"
            name={icon || 'back'}
            style={[
              {
                height: height,
                width: width,
                tintColor: getStatus(),
              },
            ]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
});
