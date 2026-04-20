import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { height: 70, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home-outline',
            Categories: 'grid-outline',
            Notifications: 'notifications-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name='Categories' component={CategoryScreen} options={{ tabBarLabel: 'Danh mục' }} />
      <Tab.Screen name='Notifications' component={NotificationsScreen} options={{ tabBarLabel: 'Thông báo' }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ tabBarLabel: 'Tài khoản' }} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MainTabs' component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name='Search' component={SearchScreen} options={{ title: 'Tìm kiếm' }} />
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
      <Stack.Screen name='Cart' component={CartScreen} options={{ title: 'Giỏ hàng' }} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ title: 'Thanh toán' }} />
      <Stack.Screen name='Orders' component={OrdersScreen} options={{ title: 'Đơn hàng của tôi' }} />
      <Stack.Screen name='PaymentMethods' component={PaymentMethodsScreen} options={{ title: 'Phương thức thanh toán' }} />
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Cài đặt' }} />
    </Stack.Navigator>
  );
}
