import React from 'react';
import { i18n } from '../../translations';
import { FONTS } from '../../constants/theme';
import { Text, View } from 'react-native';

const NoData = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250,
        width: '100%',
      }}>
      <Text style={{ fontSize: 16, color: '#969695', ...FONTS['500'] }}>{i18n.t('noPromo')}</Text>
    </View>
  );
};

export default NoData;
