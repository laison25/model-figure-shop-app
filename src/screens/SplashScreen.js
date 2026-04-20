import React, { useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Login'), 1600);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <LinearGradient colors={['#111111', '#2A2A2A']} style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>MODELIX</Text>
      <Text style={styles.subtitle}>Cửa hàng mô hình cao cấp</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#D1D5DB',
    marginTop: 8,
    fontSize: 15,
  },
});
