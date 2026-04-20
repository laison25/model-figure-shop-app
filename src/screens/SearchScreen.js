import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getCategoryName, products } from '../data/products';
import { colors } from '../theme/colors';

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const lower = keyword.toLowerCase();
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        getCategoryName(item.category).toLowerCase().includes(lower) ||
        item.studio.toLowerCase().includes(lower)
    );
  }, [keyword]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SearchBar value={keyword} onChangeText={setKeyword} placeholder='Nhập tên sản phẩm, hãng...' />
        <Text style={styles.count}>{filtered.length} sản phẩm</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filtered.map((item) => (
              <ProductCard key={item.id} item={item} compact onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, flex: 1 },
  count: { marginVertical: 16, color: colors.muted, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20 },
});
