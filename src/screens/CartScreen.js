import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../components/CartItem';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
  } = useCart();

  const shipping = cartItems.length ? 30000 : 0;
  const total = subtotal + shipping;

  if (!cartItems.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIcon}>
            <Ionicons name='cart-outline' size={28} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Giỏ hàng của bạn đang trống</Text>
          <Text style={styles.emptyText}>Thêm sản phẩm từ danh mục hoặc trang chủ để bắt đầu mua sắm.</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.emptyButtonText}>Đi tới danh mục</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.cartMeta}>{cartCount} sản phẩm trong giỏ</Text>

        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}

        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Tạm tính</Text>
            <Text style={styles.value}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phí vận chuyển</Text>
            <Text style={styles.value}>{formatPrice(shipping)}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 120 },
  cartMeta: {
    color: colors.muted,
    fontWeight: '700',
    marginBottom: 14,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginBottom: 0 },
  label: { color: colors.muted },
  value: { fontWeight: '700', color: colors.text },
  totalLabel: { fontWeight: '800', fontSize: 16 },
  totalValue: { fontWeight: '900', fontSize: 18, color: colors.primary },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  button: { backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  emptyWrap: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
