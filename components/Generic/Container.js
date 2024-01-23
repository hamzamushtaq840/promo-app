import { Layout } from '@ui-kitten/components';
import useLayout from '../../hooks/useLayout';
import React from 'react';

const Container = ({ children, style, useSafeArea = true, ...props }) => {

  const { top, bottom } = useLayout();

  return (
    <Layout
      {...props}
      style={[
        { flex: 1 },
        useSafeArea && { marginTop: top, paddingBottom: bottom, },
        style,
      ]}>
      {children}
    </Layout>
  );
};

export default Container;
