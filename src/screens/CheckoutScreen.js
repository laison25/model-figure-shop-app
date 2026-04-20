import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';

function SummaryRow({ label, value, strong = false, accent = false }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, strong && styles.summaryLabelStrong]}>{label}</Text>
      <Text style={[
        styles.summaryValue,
        strong && styles.summaryValueStrong,
        accent && styles.summaryValueAccent,
      ]}>
        {value}
      </Text>
    </View>
  );
}

export default function CheckoutScreen({ navigation }) {
  const { cartItems, subtotal, clearCart } = useCart();
  const { selectedPaymentMethod, placeOrder } = useShop();
  const [recipientName, setRecipientName] = React.useState('Lai Son');
  const [phone, setPhone] = React.useState('0989 999 999');
  const [address, setAddress] = React.useState('Văn Quán, Hà Đông, Hà Nội');
  const [note, setNote] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const shipping = cartItems.length ? 30000 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      Alert.alert('Giỏ hàng trống', 'Bạn cần thêm ít nhất một sản phẩm trước khi thanh toán.');
      navigation.navigate('Categories');
      return;
    }

    if (!recipientName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ người nhận, số điện thoại và địa chỉ giao hàng.');
      return;
    }

    setIsSubmitting(true);

    const createdOrder = placeOrder({
      items: cartItems,
      subtotal,
      shipping,
      total,
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim(),
    });

    clearCart();
    setIsSubmitting(false);

    const successTitle = selectedPaymentMethod.type === 'cod'
      ? 'Đặt hàng thành công'
      : 'Thanh toán thành công';
    const successMessage = selectedPaymentMethod.type === 'cod'
      ? `Đơn ${createdOrder.id} đã được xác nhận với hình thức ${selectedPaymentMethod.title}.`
      : `Đơn ${createdOrder.id} đã được thanh toán qua ${selectedPaymentMethod.title} và đang chờ shop chuẩn bị hàng.`;

    Alert.alert(successTitle, successMessage, [
      {
        text: 'Về trang chủ',
        style: 'cancel',
        onPress: () => navigation.navigate('MainTabs', { screen: 'Home' }),
      },
      {
        text: 'Xem đơn hàng',
        onPress: () => navigation.navigate('Orders', { filter: 'Đang chuẩn bị' }),
      },
    ]);
  };

  if (!cartItems.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <Ionicons name='receipt-outline' size={28} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Chưa có sản phẩm để thanh toán</Text>
          <Text style={styles.emptyText}>
            Hãy quay lại giỏ hàng hoặc danh mục để chọn thêm sản phẩm trước khi đặt đơn.
          </Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.emptyButtonText}>Quay về giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <TextInput
            style={styles.input}
            value={recipientName}
            onChangeText={setRecipientName}
            placeholder='Họ và tên'
            placeholderTextColor={colors.muted}
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder='Số điện thoại'
            placeholderTextColor={colors.muted}
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder='Địa chỉ nhận hàng'
            placeholderTextColor={colors.muted}
          />
          <TextInput
            style={[styles.input, styles.noteInput]}
            value={note}
            onChangeText={setNote}
            placeholder='Ghi chú cho shop'
            placeholderTextColor={colors.muted}
            multiline
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.paymentCard}
          onPress={() => navigation.navigate('PaymentMethods', { selectionMode: true })}
        >
          <View style={styles.paymentLeft}>
            <View style={styles.paymentIcon}>
              <Ionicons name={selectedPaymentMethod.icon} size={20} color={selectedPaymentMethod.accent} />
            </View>
            <View style={styles.paymentText}>
              <Text style={styles.paymentLabel}>Phương thức thanh toán</Text>
              <Text style={styles.paymentTitle}>{selectedPaymentMethod.title}</Text>
              <Text style={styles.paymentSubtitle}>{selectedPaymentMethod.subtitle}</Text>
            </View>
          </View>
          <Ionicons name='chevron-forward' size={18} color={colors.muted} />
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sản phẩm thanh toán</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.lineItem}>
              <View style={styles.lineItemInfo}>
                <Text style={styles.lineItemName}>{item.name}</Text>
                <Text style={styles.lineItemMeta}>x{item.quantity} · {item.studio}</Text>
              </View>
              <Text style={styles.lineItemValue}>{formatPrice(item.lineTotal)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
          <SummaryRow label='Tạm tính' value={formatPrice(subtotal)} />
          <SummaryRow label='Phí vận chuyển' value={formatPrice(shipping)} />
          <SummaryRow label='Tổng thanh toán' value={formatPrice(total)} strong accent />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomMeta}>
          <Text style={styles.bottomMetaLabel}>Tổng thanh toán</Text>
          <Text style={styles.bottomMetaValue}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]}
          onPress={handlePlaceOrder}
          disabled={isSubmitting}
        >
          <Text style={styles.primaryButtonText}>
            {selectedPaymentMethod.type === 'cod' ? 'Đặt hàng ngay' : 'Thanh toán và đặt hàng'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 120,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 12,
    color: colors.text,
  },
  noteInput: {
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 0,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentText: {
    flex: 1,
  },
  paymentLabel: {
    color: colors.muted,
    fontWeight: '700',
    marginBottom: 4,
  },
  paymentTitle: {
    fontWeight: '800',
    color: colors.text,
    fontSize: 16,
    marginBottom: 4,
  },
  paymentSubtitle: {
    color: '#4B5563',
    lineHeight: 20,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lineItemInfo: {
    flex: 1,
  },
  lineItemName: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  lineItemMeta: {
    color: colors.muted,
  },
  lineItemValue: {
    color: colors.text,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: colors.muted,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '700',
  },
  summaryLabelStrong: {
    color: colors.text,
    fontWeight: '800',
  },
  summaryValueStrong: {
    fontSize: 18,
    fontWeight: '900',
  },
  summaryValueAccent: {
    color: colors.primary,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomMeta: {
    flex: 1,
  },
  bottomMetaLabel: {
    color: colors.muted,
    fontWeight: '700',
    marginBottom: 4,
  },
  bottomMetaValue: {
    color: colors.primary,
    fontWeight: '900',
    fontSize: 20,
  },
  primaryButton: {
    flex: 1.2,
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
});
