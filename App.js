import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import { CartProvider } from './src/context/CartContext';
import { ShopProvider } from './src/context/ShopContext';

export default function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </CartProvider>
    </ShopProvider>
  );
}
