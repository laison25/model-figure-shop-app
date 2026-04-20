import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useShop } from '../context/ShopContext';

function PaymentMethodCard({ item, active, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.methodCard,
        { backgroundColor: item.background },
        active && styles.methodCardActive,
      ]}
      onPress={onPress}
    >
      <View style={styles.methodTop}>
        <View style={[styles.methodIcon, { backgroundColor: '#fff' }]}>
          <Ionicons name={item.icon} size={22} color={item.accent} />
        </View>
        <View style={styles.badgeWrap}>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: item.accent }]}>{item.badge}</Text>
          </View>
          <View style={[styles.radio, active && styles.radioActive]}>
            {active ? <View style={styles.radioDot} /> : null}
          </View>
        </View>
      </View>

      <Text style={styles.methodTitle}>{item.title}</Text>
      <Text style={styles.methodSubtitle}>{item.subtitle}</Text>
      {item.maskedNumber ? <Text style={styles.methodMeta}>{item.maskedNumber}</Text> : null}
    </TouchableOpacity>
  );
}

export default function PaymentMethodsScreen({ navigation, route }) {
  const {
    paymentMethods,
    selectedPaymentMethodId,
    selectedPaymentMethod,
    selectPaymentMethod,
  } = useShop();
  const selectionMode = Boolean(route?.params?.selectionMode);
  const [draftSelection, setDraftSelection] = React.useState(selectedPaymentMethodId);

  React.useEffect(() => {
    setDraftSelection(selectedPaymentMethodId);
  }, [selectedPaymentMethodId]);

  const handleSave = () => {
    selectPaymentMethod(draftSelection);

    if (selectionMode) {
      navigation.goBack();
      return;
    }

    const method = paymentMethods.find((item) => item.id === draftSelection) || paymentMethods[0];
    Alert.alert('Đã cập nhật', `Phương thức thanh toán mặc định là ${method.title}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name='card-outline' size={24} color={colors.primary} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Chọn phương thức thanh toán</Text>
            <Text style={styles.heroSubtitle}>
              Bạn có thể đổi phương thức ngay trong lúc thanh toán và hệ thống sẽ dùng lựa chọn này cho đơn hiện tại.
            </Text>
          </View>
        </View>

        <View style={styles.currentCard}>
          <Text style={styles.currentLabel}>Đang sử dụng</Text>
          <Text style={styles.currentTitle}>{selectedPaymentMethod.title}</Text>
          <Text style={styles.currentSubtitle}>{selectedPaymentMethod.subtitle}</Text>
        </View>

        <Text style={styles.sectionTitle}>Danh sách khả dụng</Text>
        {paymentMethods.map((item) => (
          <PaymentMethodCard
            key={item.id}
            item={item}
            active={draftSelection === item.id}
            onPress={() => setDraftSelection(item.id)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.addButton}
          onPress={() => Alert.alert('Sẵn sàng mở rộng', 'Màn này đã sẵn sàng để nối API thêm thẻ hoặc ví thật ở bước sau.')}
        >
          <Ionicons name='add-circle-outline' size={20} color={colors.primary} />
          <Text style={styles.addButtonText}>Thêm phương thức thanh toán khác</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity activeOpacity={0.9} style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>
            {selectionMode ? 'Áp dụng cho đơn hàng này' : 'Lưu phương thức mặc định'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FFF1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: colors.muted,
    lineHeight: 20,
  },
  currentCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
  },
  currentLabel: {
    color: '#FECACA',
    fontWeight: '700',
    marginBottom: 6,
  },
  currentTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  currentSubtitle: {
    color: '#E5E7EB',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  methodCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardActive: {
    borderColor: colors.primary,
  },
  methodTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontWeight: '800',
    fontSize: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  methodSubtitle: {
    color: '#4B5563',
    lineHeight: 20,
  },
  methodMeta: {
    marginTop: 12,
    color: colors.text,
    fontWeight: '700',
  },
  addButton: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addButtonText: {
    color: colors.primary,
    fontWeight: '800',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});
