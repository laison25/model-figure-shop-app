import React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';

const topStats = [
  { id: 't1', label: 'Đơn hoàn tất', value: '18' },
  { id: 't2', label: 'Mã giảm giá', value: '12' },
  { id: 't3', label: 'Điểm thưởng', value: '1.840' },
];

const serviceItems = [
  {
    id: 's1',
    icon: 'bag-handle-outline',
    label: 'Đơn hàng của tôi',
    description: 'Theo dõi tiến độ, kiểm tra thanh toán và xem lại lịch sử mua hàng',
    route: 'Orders',
  },
  {
    id: 's2',
    icon: 'card-outline',
    label: 'Phương thức thanh toán',
    description: 'Đổi COD, ví điện tử, thẻ hoặc chuyển khoản cho từng đơn hàng',
    route: 'PaymentMethods',
  },
  {
    id: 's3',
    icon: 'shield-checkmark-outline',
    label: 'Bảo mật tài khoản',
    description: 'Kiểm soát mật khẩu, thiết bị đăng nhập và thông tin cá nhân',
    route: 'Settings',
  },
  {
    id: 's4',
    icon: 'help-buoy-outline',
    label: 'Trung tâm hỗ trợ',
    description: 'Liên hệ shop, hỏi đơn hàng hoặc nhờ chăm sóc khách hàng hỗ trợ nhanh',
    route: 'Notifications',
  },
];

function OrderStatusItem({ item, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.orderStatusItem}
      onPress={() => navigation.navigate('Orders', { filter: item.filter })}
    >
      <View style={styles.orderIconWrap}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.orderValue}>{item.value}</Text>
      <Text style={styles.orderLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
}

function UtilityCard({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.utilityCard} onPress={onPress}>
      <View style={styles.utilityIcon}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.utilityTitle}>{item.title}</Text>
      <Text style={styles.utilitySubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
}

function ServiceRow({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.serviceRow} onPress={onPress}>
      <View style={styles.serviceIcon}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.serviceTextWrap}>
        <Text style={styles.serviceTitle}>{item.label}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
      <Ionicons name='chevron-forward' size={18} color={colors.muted} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const { cartCount } = useCart();
  const { orderCounts, paymentMethods } = useShop();

  const orderStatuses = [
    { id: 'o1', icon: 'card-outline', label: 'Chờ thanh toán', value: orderCounts.waitingPayment, filter: 'Chờ thanh toán' },
    { id: 'o2', icon: 'cube-outline', label: 'Đang chuẩn bị', value: orderCounts.preparing, filter: 'Đang chuẩn bị' },
    { id: 'o3', icon: 'car-outline', label: 'Đang giao', value: orderCounts.shipping, filter: 'Đang giao' },
    { id: 'o4', icon: 'checkmark-circle-outline', label: 'Đã giao', value: orderCounts.delivered, filter: 'Đã giao' },
  ];

  const utilities = [
    {
      id: 'u1',
      icon: 'card-outline',
      title: 'Thanh toán',
      subtitle: `${paymentMethods.length} phương thức`,
      route: 'PaymentMethods',
    },
    {
      id: 'u2',
      icon: 'notifications-outline',
      title: 'Thông báo',
      subtitle: 'Chat với shop',
      route: 'Notifications',
    },
    {
      id: 'u3',
      icon: 'cart-outline',
      title: 'Giỏ hàng',
      subtitle: `${cartCount} sản phẩm`,
      route: 'Cart',
    },
    {
      id: 'u4',
      icon: 'location-outline',
      title: 'Địa chỉ',
      subtitle: '1 địa chỉ đang dùng',
      action: 'Địa chỉ giao hàng',
    },
    {
      id: 'u5',
      icon: 'receipt-outline',
      title: 'Đơn mua',
      subtitle: `${orderCounts.total} đơn hàng`,
      route: 'Orders',
    },
    {
      id: 'u6',
      icon: 'settings-outline',
      title: 'Cài đặt',
      subtitle: 'Tài khoản và bảo mật',
      route: 'Settings',
    },
  ];

  const showPlaceholder = (label) => {
    Alert.alert(label, 'Mục này đã sẵn sàng để nối với dữ liệu thật hoặc API ở bước tiếp theo.');
  };

  const handleUtilityPress = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
      return;
    }

    showPlaceholder(item.action || item.title);
  };

  const handleServicePress = (item) => {
    if (item.route) {
      navigation.navigate(item.route);
      return;
    }

    showPlaceholder(item.action || item.label);
  };

  const highlightTitle = orderCounts.waitingPayment
    ? `Bạn có ${orderCounts.waitingPayment} đơn cần thanh toán`
    : `Có ${orderCounts.preparing} đơn đang được chuẩn bị`;

  const highlightSubtitle = orderCounts.waitingPayment
    ? 'Hoàn tất sớm để hệ thống giữ hàng và ưu tiên xử lý đơn.'
    : 'Vào mục đơn mua để theo dõi tiến độ đóng gói và giao hàng của shop.';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#D94841', '#F97316']} style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.profileRow}>
              <Image source={require('../../assets/images/logo.png')} style={styles.avatar} />
              <View style={styles.identityBlock}>
                <Text style={styles.name}>Lai Son</Text>
                <Text style={styles.email}>modelix.demo@gmail.com</Text>
                <View style={styles.memberBadge}>
                  <Ionicons name='diamond-outline' size={14} color='#fff' />
                  <Text style={styles.memberBadgeText}>Thành viên cao cấp</Text>
                </View>
              </View>
            </View>

            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerIconButton} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name='notifications-outline' size={18} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconButton} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name='settings-outline' size={18} color='#fff' />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.headerNote}>
            Ưu tiên giao nhanh, hỗ trợ đơn hàng sát sao và nhiều lựa chọn thanh toán linh hoạt như một app thương mại điện tử hoàn chỉnh.
          </Text>
        </LinearGradient>

        <View style={styles.floatingStatsCard}>
          {topStats.map((item) => (
            <View key={item.id} style={styles.topStatItem}>
              <Text style={styles.topStatValue}>{item.value}</Text>
              <Text style={styles.topStatLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.orderSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn mua</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.sectionAction}>Xem lịch sử</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orderStatusRow}>
            {orderStatuses.map((item) => (
              <OrderStatusItem key={item.id} item={item} navigation={navigation} />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.orderBanner}
            onPress={() => navigation.navigate('Orders', { filter: orderCounts.waitingPayment ? 'Chờ thanh toán' : 'Đang chuẩn bị' })}
          >
            <View style={styles.orderBannerIcon}>
              <Ionicons name='flash-outline' size={18} color={colors.primary} />
            </View>
            <View style={styles.orderBannerText}>
              <Text style={styles.orderBannerTitle}>{highlightTitle}</Text>
              <Text style={styles.orderBannerSubtitle}>{highlightSubtitle}</Text>
            </View>
            <Ionicons name='chevron-forward' size={18} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tiện ích của tôi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.sectionAction}>Quản lý</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.utilityGrid}>
            {utilities.map((item) => (
              <UtilityCard key={item.id} item={item} onPress={() => handleUtilityPress(item)} />
            ))}
          </View>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoHeader}>
            <Text style={styles.promoEyebrow}>Ưu đãi thành viên</Text>
            <Text style={styles.promoValue}>{formatPrice(28600000)}</Text>
          </View>
          <Text style={styles.promoTitle}>Bạn đang ở nhóm khách hàng ưu tiên</Text>
          <Text style={styles.promoSubtitle}>
            Tiếp tục mua sắm để mở thêm mã freeship, gói đóng hộp nâng cao và quyền truy cập sớm vào các bản giới hạn.
          </Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Còn khoảng {formatPrice(3400000)} để lên mốc ưu đãi tiếp theo</Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dịch vụ tài khoản</Text>
          </View>

          {serviceItems.map((item) => (
            <ServiceRow key={item.id} item={item} onPress={() => handleServicePress(item)} />
          ))}
        </View>
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
  headerCard: {
    borderRadius: 28,
    padding: 20,
    paddingBottom: 26,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  identityBlock: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  email: {
    color: '#FDE68A',
    marginBottom: 8,
    fontWeight: '600',
  },
  memberBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  memberBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNote: {
    color: '#FFF7ED',
    marginTop: 18,
    lineHeight: 21,
  },
  floatingStatsCard: {
    marginTop: -18,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  topStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  topStatValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 6,
  },
  topStatLabel: {
    color: colors.muted,
    fontWeight: '600',
    textAlign: 'center',
  },
  orderSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 18,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  sectionAction: {
    color: colors.primary,
    fontWeight: '800',
  },
  orderStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  orderStatusItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  orderIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  orderValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 4,
  },
  orderLabel: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  orderBanner: {
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderBannerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBannerText: {
    flex: 1,
  },
  orderBannerTitle: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 4,
  },
  orderBannerSubtitle: {
    color: colors.muted,
    lineHeight: 19,
  },
  utilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  utilityCard: {
    width: '31%',
    backgroundColor: '#F9FAFB',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  utilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  utilityTitle: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 4,
  },
  utilitySubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 16,
  },
  promoCard: {
    marginTop: 18,
    backgroundColor: '#111827',
    borderRadius: 28,
    padding: 20,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promoEyebrow: {
    color: '#FCA5A5',
    fontWeight: '800',
  },
  promoValue: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
  },
  promoTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  promoSubtitle: {
    color: '#D1D5DB',
    lineHeight: 21,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 18,
    overflow: 'hidden',
  },
  progressFill: {
    width: '78%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FB7185',
  },
  progressText: {
    color: '#F3F4F6',
    marginTop: 10,
    fontWeight: '600',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTextWrap: {
    flex: 1,
  },
  serviceTitle: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 4,
  },
  serviceDescription: {
    color: colors.muted,
    lineHeight: 19,
  },
});
