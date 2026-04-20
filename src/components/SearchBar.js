import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function SearchBar({ placeholder = 'Tìm kiếm mô hình...', value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name='search-outline' size={20} color={colors.muted} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: colors.text,
  },
});
