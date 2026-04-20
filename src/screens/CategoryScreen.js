import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';
import { colors } from '../theme/colors';

const priceFilters = [
  { id: 'all', label: 'Tất cả' },
  { id: 'under8', label: 'Dưới 8 triệu', max: 8000000 },
  { id: '8to12', label: '8 - 12 triệu', min: 8000000, max: 12000000 },
  { id: '12to16', label: '12 - 16 triệu', min: 12000000, max: 16000000 },
  { id: 'over16', label: 'Trên 16 triệu', min: 16000000 },
];

const sortOptions = [
  { id: 'popular', label: 'Phổ biến' },
  { id: 'priceAsc', label: 'Giá tăng dần' },
  { id: 'priceDesc', label: 'Giá giảm dần' },
];

export default function CategoryScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'all'
      ? [...products]
      : products.filter((item) => item.category === selectedCategory);

    const priceFilter = priceFilters.find((item) => item.id === selectedPrice);

    if (priceFilter && priceFilter.id !== 'all') {
      result = result.filter((item) => {
        const meetsMin = typeof priceFilter.min === 'number' ? item.price >= priceFilter.min : true;
        const meetsMax = typeof priceFilter.max === 'number' ? item.price < priceFilter.max : true;
        return meetsMin && meetsMax;
      });
    }

    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => {
        if (b.featured !== a.featured) {
          return Number(b.featured) - Number(a.featured);
        }
        return b.sold - a.sold;
      });
    }

    return result;
  }, [selectedCategory, selectedPrice, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar placeholder='Tìm bộ sưu tập, hãng hoặc dòng mô hình...' />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {categories.map((item) => (
            <CategoryChip
              key={item.id}
              label={item.name}
              active={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
            />
          ))}
        </ScrollView>

        <View style={styles.filterCard}>
          <Text style={styles.filterTitle}>Lọc theo giá</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {priceFilters.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                style={[styles.filterChip, selectedPrice === item.id && styles.filterChipActive]}
                onPress={() => setSelectedPrice(item.id)}
              >
                <Text style={[styles.filterChipText, selectedPrice === item.id && styles.filterChipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.filterTitle, styles.sortTitle]}>Sắp xếp theo giá</Text>
          <View style={styles.sortRow}>
            {sortOptions.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                style={[styles.sortButton, sortBy === item.id && styles.sortButtonActive]}
                onPress={() => setSortBy(item.id)}
              >
                <Text style={[styles.sortButtonText, sortBy === item.id && styles.sortButtonTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.resultText}>{filteredProducts.length} sản phẩm phù hợp</Text>

        <View style={styles.grid}>
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              compact
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 30 },
  row: { marginTop: 18, marginBottom: 16 },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  sortTitle: {
    marginTop: 18,
  },
  filterRow: {
    gap: 10,
    paddingRight: 4,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F9FAFB',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 12,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#FDE8E8',
    borderColor: '#FCA5A5',
  },
  sortButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 12,
  },
  sortButtonTextActive: {
    color: colors.primary,
  },
  resultText: {
    marginBottom: 14,
    color: colors.muted,
    fontWeight: '600',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});
