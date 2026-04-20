import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity style={[styles.chip, active && styles.active]} onPress={onPress}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
});
