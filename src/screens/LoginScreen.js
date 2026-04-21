import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSection}>
        <Image source={require('../../assets/images/figure1.jpg')} style={styles.hero} resizeMode="cover" />
      </View>
      <View style={styles.formSection}>
        <Text style={styles.title}>Đăng nhập vào Modelix</Text>
        <Text style={styles.subtitle}>Nhập thông tin của bạn bên dưới</Text>

        <TextInput placeholder='Email hoặc số điện thoại' style={styles.input} placeholderTextColor={colors.muted} />
        <TextInput placeholder='Mật khẩu' style={styles.input} placeholderTextColor={colors.muted} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageSection: {
    flex: 1.15,
    backgroundColor: '#F4D8D8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  hero: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 22,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 14,
    marginBottom: 12,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: 16,
    fontWeight: '600',
  },
});
