import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.textBlock}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.studio}</Text>
          </View>
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name='trash-outline' size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.lineTotal}>Tổng: {formatPrice(item.lineTotal)}</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={onDecrease} style={styles.qtyButton}>
              <Ionicons name='remove' size={16} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrease} style={styles.qtyButton}>
              <Ionicons name='add' size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.qtyHint}>Có thể chỉnh số lượng như trên Shopee</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 14,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  textBlock: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  meta: {
    color: colors.muted,
    marginTop: 2,
    marginBottom: 6,
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    gap: 10,
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
  },
  lineTotal: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 12,
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  qtyButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    minWidth: 32,
    textAlign: 'center',
    fontWeight: '700',
  },
  qtyHint: {
    flex: 1,
    color: colors.muted,
    fontSize: 11,
    textAlign: 'right',
  },
});
