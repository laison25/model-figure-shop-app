import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useShop } from '../context/ShopContext';

const tabs = ['Tất cả', 'Chờ thanh toán', 'Đang chuẩn bị', 'Đang giao', 'Đã giao'];

const statusMeta = {
  'Chờ thanh toán': {
    icon: 'card-outline',
    background: '#FEF2F2',
    color: colors.primary,
  },
  'Đang chuẩn bị': {
    icon: 'cube-outline',
    background: '#FFF7ED',
    color: colors.warning,
  },
  'Đang giao': {
    icon: 'car-outline',
    background: '#EFF6FF',
    color: '#2563EB',
  },
  'Đã giao': {
    icon: 'checkmark-circle-outline',
    background: '#ECFDF5',
    color: colors.success,
  },
};

export default function OrdersScreen({ route, navigation }) {
  const { orders, orderCounts, selectedPaymentMethod, markOrderPaid } = useShop();
  const requestedFilter = route?.params?.filter;
  const initialFilter = tabs.includes(requestedFilter) ? requestedFilter : 'Tất cả';
  const [activeTab, setActiveTab] = React.useState(initialFilter);

  React.useEffect(() => {
    if (tabs.includes(requestedFilter)) {
      setActiveTab(requestedFilter);
    }
  }, [requestedFilter]);

  const visibleOrders = activeTab === 'Tất cả'
    ? orders
    : orders.filter((item) => item.status === activeTab);

  const handlePrimaryAction = (order) => {
    if (order.status === 'Chờ thanh toán') {
      const updated = markOrderPaid(order.id);

      if (updated) {
        Alert.alert(
          'Thanh toán thành công',
          `Đơn ${order.id} đã được thanh toán bằng ${selectedPaymentMethod.title} và đã chuyển sang trạng thái Đang chuẩn bị.`
        );
        setActiveTab('Đang chuẩn bị');
      }
      return;
    }

    if (order.status === 'Đã giao') {
      navigation.navigate('Categories');
      return;
    }

    Alert.alert(order.primaryAction, `Đơn ${order.id} hiện đang được xử lý. Bạn có thể tiếp tục theo dõi trong danh sách đơn hàng.`);
  };

  const handleSupport = (order) => {
    Alert.alert('Chăm sóc khách hàng', `Shop đã nhận yêu cầu hỗ trợ cho đơn ${order.id}.`);
    navigation.navigate('MainTabs', { screen: 'Notifications' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{orderCounts.waitingPayment}</Text>
            <Text style={styles.summaryLabel}>Chờ thanh toán</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{orderCounts.preparing}</Text>
            <Text style={styles.summaryLabel}>Đang chuẩn bị</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{orderCounts.shipping}</Text>
            <Text style={styles.summaryLabel}>Đang giao</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{orderCounts.delivered}</Text>
            <Text style={styles.summaryLabel}>Đã giao</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.9}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {visibleOrders.map((item) => {
          const meta = statusMeta[item.status];

          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.id}>{item.id}</Text>
                  <Text style={styles.shopText}>{item.shop}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: meta.background }]}>
                  <Ionicons name={meta.icon} size={16} color={meta.color} />
                  <Text style={[styles.statusText, { color: meta.color }]}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Ionicons name='time-outline' size={16} color={colors.muted} />
                <Text style={styles.metaText}>Đặt ngày {item.placedAt}</Text>
              </View>

              <View style={styles.paymentRow}>
                <Ionicons name='card-outline' size={16} color={colors.primary} />
                <Text style={styles.paymentText}>{item.paymentMethodLabel}</Text>
                <Text style={styles.paymentStatus}>{item.paymentStatus}</Text>
              </View>

              <View style={styles.updateBox}>
                <Text style={styles.updateTitle}>Cập nhật mới nhất</Text>
                <Text style={styles.updateText}>{item.update}</Text>
              </View>

              <View style={styles.itemsBox}>
                {item.items.map((product) => (
                  <View key={`${item.id}-${product.name}`} style={styles.itemRow}>
                    <Text style={styles.itemName}>{product.name}</Text>
                    <Text style={styles.itemQty}>x{product.quantity}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.deliveryRow}>
                <Ionicons name='location-outline' size={16} color={colors.primary} />
                <Text style={styles.deliveryText}>{item.shippingAddress}</Text>
              </View>

              <View style={styles.deliveryRow}>
                <Ionicons name='navigate-outline' size={16} color={colors.primary} />
                <Text style={styles.deliveryText}>{item.delivery}</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tổng đơn</Text>
                <Text style={styles.total}>{formatPrice(item.total)}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.secondaryButton}
                  onPress={() => handleSupport(item)}
                >
                  <Text style={styles.secondaryButtonText}>Cần hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.primaryButton}
                  onPress={() => handlePrimaryAction(item)}
                >
                  <Text style={styles.primaryButtonText}>{item.primaryAction}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {!visibleOrders.length ? (
          <View style={styles.emptyState}>
            <Ionicons name='bag-handle-outline' size={26} color={colors.muted} />
            <Text style={styles.emptyTitle}>Không có đơn ở trạng thái này</Text>
            <Text style={styles.emptyText}>
              Hãy thử bộ lọc khác để xem lại các đơn gần đây của bạn.
            </Text>
          </View>
        ) : null}
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
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 18,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  summaryLabel: {
    color: colors.muted,
    fontWeight: '600',
  },
  tabRow: {
    paddingBottom: 8,
    gap: 10,
  },
  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    color: colors.text,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  id: {
    fontWeight: '900',
    fontSize: 17,
    color: colors.text,
    marginBottom: 4,
  },
  shopText: {
    color: colors.muted,
    fontWeight: '600',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  metaText: {
    color: colors.muted,
  },
  paymentRow: {
    marginTop: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  paymentText: {
    color: colors.text,
    fontWeight: '700',
    flexShrink: 1,
  },
  paymentStatus: {
    color: colors.primary,
    fontWeight: '800',
  },
  updateBox: {
    marginTop: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  updateTitle: {
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  updateText: {
    color: '#4B5563',
    lineHeight: 21,
  },
  itemsBox: {
    marginTop: 14,
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: colors.text,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  itemQty: {
    color: colors.muted,
    fontWeight: '700',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  deliveryText: {
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  totalRow: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.muted,
    fontWeight: '700',
  },
  total: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 18,
  },
  actionRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FBCFE8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '800',
  },
  primaryButton: {
    flex: 1.2,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  emptyState: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 10,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
