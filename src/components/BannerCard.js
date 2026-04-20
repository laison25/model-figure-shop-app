import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function BannerCard({ item }) {
  return (
    <ImageBackground source={item.image} style={styles.banner} imageStyle={styles.imageStyle}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: 300,
    height: 170,
    marginRight: 14,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(17,17,17,0.48)',
    borderRadius: 20,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: '#E5E7EB',
    fontSize: 13,
  },
});
