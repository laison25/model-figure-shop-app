import React, { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCategoryName, products } from '../data/products';
import { colors } from '../theme/colors';
import { formatPrice } from '../utils/format';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { addToCart, getItemQuantity } = useCart();
  const productId = route.params?.productId || 'p1';
  const product = useMemo(() => products.find((item) => item.id === productId) || products[0], [productId]);
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const quantity = getItemQuantity(product.id);

  const openSupport = () => {
    Alert.alert('Nhắn shop', 'Khung chat hỗ trợ sản phẩm đã sẵn sàng để nối với chăm sóc khách hàng.');
    navigation.navigate('MainTabs', { screen: 'Notifications' });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Image source={selectedImage} style={styles.mainImage} resizeMode='cover' />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryRow}>
          {product.gallery.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(img)} style={styles.thumbWrap}>
              <Image source={img} style={styles.thumb} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.meta}>{product.studio} · {getCategoryName(product.category)}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★ {product.rating}</Text>
          <Text style={styles.sold}>{product.sold} đã bán</Text>
          <Text style={styles.stock}>Còn hàng</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(product.oldPrice)}</Text>
        </View>

        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.infoBox}>
          <View style={styles.infoItem}><Ionicons name='cube-outline' size={18} color={colors.primary} /><Text style={styles.infoText}>Đóng gói cao cấp</Text></View>
          <View style={styles.infoItem}><Ionicons name='car-outline' size={18} color={colors.primary} /><Text style={styles.infoText}>Miễn phí giao nội thành</Text></View>
          <View style={styles.infoItem}><Ionicons name='shield-checkmark-outline' size={18} color={colors.primary} /><Text style={styles.infoText}>Cam kết chính hãng</Text></View>
        </View>

        <Text style={styles.relatedTitle}>Sản phẩm liên quan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {related.map((item) => (
            <ProductCard key={item.id} item={item} onPress={() => navigation.push('ProductDetail', { productId: item.id })} />
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.footerBar}>
        <TouchableOpacity style={styles.circleBtn} onPress={openSupport}>
          <Ionicons name='chatbubble-ellipses-outline' size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addCartBtn} onPress={() => addToCart(product)}>
          <Ionicons name='cart-outline' size={18} color={colors.primary} />
          <Text style={styles.addCartText}>{quantity > 0 ? `Đã thêm ${quantity}` : 'Thêm vào giỏ'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => {
            addToCart(product);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.buyText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 110 },
  mainImage: { width: '100%', height: 320, borderRadius: 24, backgroundColor: '#fff' },
  galleryRow: { marginTop: 14, marginBottom: 12 },
  thumbWrap: { marginRight: 10 },
  thumb: { width: 82, height: 82, borderRadius: 14 },
  name: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 8 },
  meta: { color: colors.muted, marginTop: 6 },
  ratingRow: { flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'center', flexWrap: 'wrap' },
  star: { color: '#F59E0B', fontWeight: '800' },
  sold: { color: colors.muted },
  stock: { color: colors.success, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  price: { color: colors.primary, fontSize: 28, fontWeight: '800' },
  oldPrice: { color: colors.muted, textDecorationLine: 'line-through' },
  desc: { marginTop: 16, color: '#374151', lineHeight: 24 },
  infoBox: { backgroundColor: colors.card, borderRadius: 18, padding: 16, marginTop: 18, borderWidth: 1, borderColor: colors.border, gap: 12 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { color: colors.text, fontWeight: '600' },
  relatedTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 24, marginBottom: 14 },
  footerBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  circleBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCartBtn: {
    flex: 1.2,
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  addCartText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  buyBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  buyText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
