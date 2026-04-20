import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import BannerCard from '../components/BannerCard';
import { banners, categories, products } from '../data/products';
import { colors } from '../theme/colors';

const heroStats = [
  { id: 'h1', label: 'Ưu đãi đang chạy', value: '06' },
  { id: 'h2', label: 'Giao nhanh', value: '24h' },
  { id: 'h3', label: 'Chính hãng', value: '100%' },
];

const shortcuts = [
  {
    id: 's1',
    icon: 'bag-handle-outline',
    title: 'Đơn hàng',
    subtitle: 'Theo dõi đơn của bạn',
    route: 'Orders',
    params: { filter: 'Đang giao' },
  },
  {
    id: 's2',
    icon: 'ticket-outline',
    title: 'Ưu đãi',
    subtitle: 'Mã giảm giá mỗi tuần',
    route: 'Categories',
  },
  {
    id: 's3',
    icon: 'notifications-outline',
    title: 'Thông báo',
    subtitle: 'Nhắn với shop',
    route: 'Notifications',
  },
  {
    id: 's4',
    icon: 'card-outline',
    title: 'Thanh toán',
    subtitle: 'Thẻ và COD',
    route: 'PaymentMethods',
  },
];

const categoryHighlights = [
  {
    id: 'c1',
    icon: 'game-controller-outline',
    title: 'Pokemon Resin',
    subtitle: 'Những mẫu diorama chiến đấu và phối màu nổi bật cho fan Pokemon',
  },
  {
    id: 'c2',
    icon: 'sparkles-outline',
    title: 'Anime nổi bật',
    subtitle: 'Các nhân vật đình đám với lớp sơn đẹp và dáng trưng bày cao cấp',
  },
  {
    id: 'c3',
    icon: 'hardware-chip-outline',
    title: 'Mecha mạnh mẽ',
    subtitle: 'Chi tiết cơ khí sắc nét, khung lớn và hiệu ứng cực kỳ ấn tượng',
  },
  {
    id: 'c4',
    icon: 'diamond-outline',
    title: 'Bản giới hạn',
    subtitle: 'Số lượng ít dành cho người sưu tầm muốn tìm món thật đặc biệt',
  },
];

const collections = [
  {
    id: 'p1',
    icon: 'flame-outline',
    title: 'Khu giá sốc',
    subtitle: 'Những mẫu resin cao cấp đang giảm giá sâu trong thời gian ngắn',
    background: '#111827',
    accent: '#F59E0B',
  },
  {
    id: 'p2',
    icon: 'rocket-outline',
    title: 'Có sẵn giao nhanh',
    subtitle: 'Hàng trong kho, đóng gói kỹ và ưu tiên cho đơn cần nhận sớm',
    background: '#7F1D1D',
    accent: '#FDBA74',
  },
  {
    id: 'p3',
    icon: 'shield-checkmark-outline',
    title: 'Studio uy tín',
    subtitle: 'Đối tác được xác minh với chất lượng sản xuất và hoàn thiện ổn định',
    background: '#1F2937',
    accent: '#93C5FD',
  },
];

const trendingSearches = ['Tượng One Piece', 'Tỷ lệ 1/4', 'Resin GK', 'Bản giới hạn'];

function ShortcutCard({ item, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.shortcutCard}
      onPress={() => navigation.navigate(item.route, item.params)}
    >
      <View style={styles.shortcutIcon}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.shortcutTitle}>{item.title}</Text>
      <Text style={styles.shortcutSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
}

function CategoryHighlightCard({ item, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.highlightCard}
      onPress={() => navigation.navigate('Categories')}
    >
      <View style={styles.highlightIcon}>
        <Ionicons name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.highlightTitle}>{item.title}</Text>
      <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
}

function CollectionCard({ item, navigation }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.collectionCard, { backgroundColor: item.background }]}
      onPress={() => navigation.navigate('Categories')}
    >
      <View style={styles.collectionIcon}>
        <Ionicons name={item.icon} size={20} color={item.accent} />
      </View>
      <Text style={styles.collectionTitle}>{item.title}</Text>
      <Text style={styles.collectionSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const featured = products.filter((item) => item.featured);
  const recommended = products.slice(0, 4);
  const newArrivals = products.filter((item) => !item.featured).slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Văn Quán , Hà Nội</Text>
            <Text style={styles.locationValue}>LZON Modelix</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
              <Ionicons name='search-outline' size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name='cart-outline' size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Search')}>
          <SearchBar placeholder='Tìm tượng, mô hình anime, resin, hộp mù...' />
        </TouchableOpacity>

        <LinearGradient colors={['#111827', '#7F1D1D']} style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroBadge}>
              <Ionicons name='flash-outline' size={14} color='#fff' />
              <Text style={styles.heroBadgeText}>Tuần lễ sưu tầm</Text>
            </View>
            <TouchableOpacity style={styles.heroGhostButton} onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.heroGhostText}>Khám phá ngay</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heroTitle}>Dựng kệ trưng bày mơ ước với ưu đãi thông minh</Text>
          <Text style={styles.heroSubtitle}>
            Khuyến mãi chớp nhoáng, đóng gói chắc chắn và những mẫu từ studio uy tín được tuyển chọn như một ứng dụng mua sắm chuyên nghiệp.
          </Text>

          <View style={styles.heroStatsRow}>
            {heroStats.map((item) => (
              <View key={item.id} style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>{item.value}</Text>
                <Text style={styles.heroStatLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.shortcutGrid}>
          {shortcuts.map((item) => (
            <ShortcutCard key={item.id} item={item} navigation={navigation} />
          ))}
        </View>

        <SectionHeader title='Mua theo danh mục' actionText='Xem tất cả' onPress={() => navigation.navigate('Categories')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {categories.map((item, index) => (
            <CategoryChip
              key={item.id}
              label={item.name}
              active={index === 0}
              onPress={() => navigation.navigate('Categories')}
            />
          ))}
        </ScrollView>

        <View style={styles.highlightGrid}>
          {categoryHighlights.map((item) => (
            <CategoryHighlightCard key={item.id} item={item} navigation={navigation} />
          ))}
        </View>

        <SectionHeader title='Ưu đãi nổi bật' actionText='Xem thêm' onPress={() => navigation.navigate('Categories')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bannerRow}>
          {banners.map((item) => (
            <BannerCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <View style={styles.sectionSpacing} />
        <SectionHeader title='Giá sốc hôm nay' actionText='Xem tất cả' onPress={() => navigation.navigate('Categories')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsRow}>
          {featured.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionSpacing} />
        <SectionHeader title='Gợi ý cho dân sưu tầm' actionText='Khám phá' onPress={() => navigation.navigate('Categories')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.collectionRow}>
          {collections.map((item) => (
            <CollectionCard key={item.id} item={item} navigation={navigation} />
          ))}
        </ScrollView>

        <View style={styles.sectionSpacing} />
        <SectionHeader title='Dành cho bạn' actionText='Xem thêm' onPress={() => navigation.navigate('Categories')} />
        <View style={styles.recommendGrid}>
          {recommended.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              compact
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </View>

        <View style={styles.sectionSpacing} />
        <SectionHeader title='Hàng mới về' actionText='Xem thêm' onPress={() => navigation.navigate('Categories')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsRow}>
          {newArrivals.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </ScrollView>

        <View style={styles.keywordWrap}>
          <Text style={styles.keywordTitle}>Từ khóa nổi bật</Text>
          <View style={styles.keywordRow}>
            {trendingSearches.map((item) => (
              <TouchableOpacity key={item} style={styles.keywordChip} activeOpacity={0.9} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.keywordText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.serviceRow}>
          <View style={styles.serviceCard}>
            <Ionicons name='cube-outline' size={20} color={colors.primary} />
            <Text style={styles.serviceText}>Đóng gói chống sốc cao cấp</Text>
          </View>
          <View style={styles.serviceCard}>
            <Ionicons name='rocket-outline' size={20} color={colors.primary} />
            <Text style={styles.serviceText}>Nhiều lựa chọn giao nhanh</Text>
          </View>
          <View style={styles.serviceCard}>
            <Ionicons name='shield-checkmark-outline' size={20} color={colors.primary} />
            <Text style={styles.serviceText}>Studio đối tác chính hãng</Text>
          </View>
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationLabel: {
    color: colors.muted,
    fontSize: 13,
  },
  locationValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginTop: 18,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  heroGhostButton: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  heroGhostText: {
    color: '#fff',
    fontWeight: '700',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroSubtitle: {
    color: '#E5E7EB',
    marginTop: 10,
    lineHeight: 21,
  },
  heroStatsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  heroStatValue: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 4,
  },
  heroStatLabel: {
    color: '#E5E7EB',
    fontSize: 12,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 18,
    marginBottom: 26,
  },
  shortcutCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shortcutIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  shortcutTitle: {
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  shortcutSubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  categoryRow: {
    marginBottom: 16,
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 26,
  },
  highlightCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlightIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  highlightTitle: {
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  highlightSubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  bannerRow: {
    paddingRight: 4,
  },
  productsRow: {
    paddingRight: 4,
  },
  collectionRow: {
    paddingRight: 4,
  },
  collectionCard: {
    width: 240,
    borderRadius: 24,
    padding: 18,
    marginRight: 14,
  },
  collectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  collectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  collectionSubtitle: {
    color: '#E5E7EB',
    lineHeight: 20,
  },
  sectionSpacing: {
    height: 26,
  },
  recommendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keywordWrap: {
    marginTop: 26,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  keywordTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 14,
  },
  keywordRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  keywordChip: {
    backgroundColor: '#F9FAFB',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  keywordText: {
    color: colors.text,
    fontWeight: '600',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 10,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceText: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },
});
