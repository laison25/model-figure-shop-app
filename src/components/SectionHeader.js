import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

export default function SectionHeader({ title, actionText = 'Xem tất cả', onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.action}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  action: {
    color: colors.primary,
    fontWeight: '600',
  },
});
