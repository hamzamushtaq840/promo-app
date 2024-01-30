import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React from 'react';
import { UserProvider } from '../../context/dataContext';

const queryClient = new QueryClient();

const _layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default _layout;
