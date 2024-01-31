import { Image, useImage } from '@shopify/react-native-skia';
import React from 'react';

const ScratcherImage = ({ source, height, width }) => {
  const loadedImage = useImage(source);

  return <Image image={loadedImage} x={0} y={0} fit="cover" height={height} width={width} />;
};

export default ScratcherImage;
