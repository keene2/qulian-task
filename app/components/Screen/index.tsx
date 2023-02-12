import React from 'react';
import { View } from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
}

function Screen({ children }: ScreenProps) {
  return <View>{children}</View>;
}

export default Screen;
