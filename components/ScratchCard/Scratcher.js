import { Vertices, vec } from '@shopify/react-native-skia';
import React from 'react';

const Scratcher = ({ height = 300, width = 300 }) => {
  const vertices = [vec(0, 0), vec(height, 0), vec(height, width), vec(0, height)];
  const colors = ['#61DAFB', '#61DAFB', '#dafb61', '#61fbcf'];
  const triangle1 = [0, 1, 2];
  const triangle2 = [0, 2, 3];
  const indices = [...triangle1, ...triangle2];

  return <Vertices style={'fill'} vertices={vertices} colors={colors} indices={indices} />;
};

export default Scratcher;
