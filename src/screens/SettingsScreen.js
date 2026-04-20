import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const groupItems = [
  {
    title: 'Tài khoản',
    items: [
      {
        id: 'profile',
        icon: 'person-circle-outline',
        label: 'Chỉnh sửa hồ sơ',
        description: 'Cập nhật ảnh đại diện, phần giới thiệu và thông tin liên hệ',
      },
      {
        id: 'address',
        icon: 'location-outline',
        label: 'Địa chỉ giao hàng',
        description: 'Lưu địa chỉ nhà, công ty hoặc điểm nhận hàng riêng',
      },
      {
        id: 'language',
        icon: 'language-outline',
        label: 'Ngôn ngữ và khu vực',
        description: 'Thiết lập tiếng Việt, VND và tuỳ chọn giao hàng nội địa',
      },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [
      {
        id: 'security',
        icon: 'shield-checkmark-outline',
        label: 'Trung tâm bảo mật',
        description: 'Mật khẩu, thiết bị đã đăng nhập và xác minh tài khoản',
      },
      {
        id: 'help',
        icon: 'help-buoy-outline',
        label: 'Trung tâm trợ giúp',
        description: 'Câu hỏi về giao hàng, đổi trả và hỗ trợ người sưu tầm',
      },
    ],
  },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = React.useState({
    orderUpdates: true,
    promoAlerts: true,
    biometricLogin: false,
  });

  const updateToggle = (key) => {
    setToggles((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const showPlaceholder = (label) => {
    Alert.alert(label, 'Màn chi tiết này có thể được nối với dữ liệu tài khoản thật ở bước tiếp theo.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name='settings-outline' size={24} color={colors.primary} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Tùy chọn mua sắm</Text>
            <Text style={styles.heroSubtitle}>
              Tinh chỉnh thông báo, thông tin tài khoản và thiết lập mặc định để mua hàng mượt hơn.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Điều khiển nhanh</Text>
        <View style={styles.groupCard}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.rowTitle}>Cập nhật đơn hàng</Text>
              <Text style={styles.rowSubtitle}>Nhận thông báo khi đóng gói, giao đi và giao thành công</Text>
            </View>
            <Switch
              value={toggles.orderUpdates}
              onValueChange={() => updateToggle('orderUpdates')}
              thumbColor='#fff'
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleText}>
              <Text style={styles.rowTitle}>Thông báo ưu đãi</Text>
              <Text style={styles.rowSubtitle}>Nhắc khuyến mãi chớp nhoáng và mã giảm giá cho các dòng sản phẩm yêu thích</Text>
            </View>
            <Switch
              value={toggles.promoAlerts}
              onValueChange={() => updateToggle('promoAlerts')}
              thumbColor='#fff'
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
            />
          </View>

          <View style={[styles.toggleRow, styles.lastRow]}>
            <View style={styles.toggleText}>
              <Text style={styles.rowTitle}>Đăng nhập sinh trắc học</Text>
              <Text style={styles.rowSubtitle}>Dùng khuôn mặt hoặc vân tay trên thiết bị được hỗ trợ</Text>
            </View>
            <Switch
              value={toggles.biometricLogin}
              onValueChange={() => updateToggle('biometricLogin')}
              thumbColor='#fff'
              trackColor={{ false: '#D1D5DB', true: colors.primary }}
            />
          </View>
        </View>

        {groupItems.map((group) => (
          <View key={group.title} style={styles.sectionWrap}>
            <Text style={styles.sectionTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  style={[styles.linkRow, index === group.items.length - 1 && styles.lastRow]}
                  onPress={() => showPlaceholder(item.label)}
                >
                  <View style={styles.linkIcon}>
                    <Ionicons name={item.icon} size={20} color={colors.primary} />
                  </View>
                  <View style={styles.linkText}>
                    <Text style={styles.rowTitle}>{item.label}</Text>
                    <Text style={styles.rowSubtitle}>{item.description}</Text>
                  </View>
                  <Ionicons name='chevron-forward' size={18} color={colors.muted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  heroSubtitle: {
    color: colors.muted,
    lineHeight: 20,
  },
  sectionWrap: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  toggleText: {
    flex: 1,
    paddingRight: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  linkIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    flex: 1,
  },
  rowTitle: {
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  rowSubtitle: {
    color: colors.muted,
    lineHeight: 18,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});
