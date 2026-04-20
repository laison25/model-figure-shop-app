import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tạo tài khoản</Text>
        <Text style={styles.subtitle}>Tham gia Modelix để theo dõi đơn hàng và lưu danh sách yêu thích.</Text>

        <TextInput placeholder='Họ và tên' style={styles.input} placeholderTextColor={colors.muted} />
        <TextInput placeholder='Email' style={styles.input} placeholderTextColor={colors.muted} />
        <TextInput placeholder='Số điện thoại' style={styles.input} placeholderTextColor={colors.muted} />
        <TextInput placeholder='Mật khẩu' style={styles.input} placeholderTextColor={colors.muted} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 30, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.muted, marginTop: 10, marginBottom: 24, lineHeight: 22 },
  input: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  link: { textAlign: 'center', marginTop: 18, color: colors.primary, fontWeight: '600' },
});
