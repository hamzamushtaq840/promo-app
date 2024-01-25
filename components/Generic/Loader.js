import { Spinner } from '@ui-kitten/components';
import { View } from 'react-native';

const Loader = ({ status = 'basic', center, mt, mb, height }) => {
  return (
    <View
      style={{
        height: height,
        borderRadius: 4,
        alignSelf: center ? 'center' : '',
        marginTop: mt,
        marginBottom: mb,
      }}>
      <Spinner status={status} />
    </View>
  );
};

export default Loader;
