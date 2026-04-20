import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function ProductCard({ item, onPress, compact = false, showAddButton = true }) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  return (
    <View style={[styles.card, compact && styles.compact]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.imageWrap}>
          <Image source={item.image} style={styles.image} resizeMode='cover' />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{Math.max(5, Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100))}%</Text>
          </View>
          {quantity > 0 ? (
            <View style={styles.quantityBadge}>
              <Ionicons name='cart' size={12} color='#fff' />
              <Text style={styles.quantityBadgeText}>{quantity}</Text>
            </View>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <Text style={styles.studio}>{item.studio}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(item.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.sold}>{item.sold} đã bán</Text>
        </View>
      </TouchableOpacity>

      {showAddButton ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.addButton, quantity > 0 && styles.addButtonActive]}
          onPress={() => addToCart(item)}
        >
          <Ionicons name='cart-outline' size={16} color={quantity > 0 ? '#fff' : colors.primary} />
          <Text style={[styles.addButtonText, quantity > 0 && styles.addButtonTextActive]}>
            {quantity > 0 ? 'Thêm nữa' : 'Thêm vào giỏ'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    width: 180,
    marginRight: 14,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compact: {
    width: '48%',
    marginRight: 0,
    marginBottom: 14,
  },
  imageWrap: {
    position: 'relative',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  quantityBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 34,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(17,24,39,0.82)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  quantityBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  studio: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
  },
  oldPrice: {
    color: colors.muted,
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  rating: {
    marginTop: 6,
    color: '#F59E0B',
    fontWeight: '700',
  },
  sold: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 12,
  },
  addButton: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF1F2',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  addButtonText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  addButtonTextActive: {
    color: '#fff',
  },
});
