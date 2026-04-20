import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const conversations = [
  {
    id: 'n1',
    icon: 'chatbubble-ellipses-outline',
    title: 'Shop chăm sóc khách hàng',
    subtitle: 'Xin chào, shop có thể hỗ trợ bạn về sản phẩm, giao hàng hoặc đổi trả.',
    time: 'Vừa xong',
    unread: 2,
  },
  {
    id: 'n2',
    icon: 'cube-outline',
    title: 'Hỗ trợ đơn #MDX002',
    subtitle: 'Đơn hàng của bạn đang giao tới khu vực nhận. Bạn cần kiểm tra thêm gì không?',
    time: '10 phút',
    unread: 1,
  },
  {
    id: 'n3',
    icon: 'pricetag-outline',
    title: 'Thông báo từ shop',
    subtitle: 'Bạn có mã giảm giá mới dành riêng cho thành viên thân thiết trong tuần này.',
    time: '1 giờ',
    unread: 0,
  },
];

const quickHelp = [
  'Hỏi tình trạng đơn hàng',
  'Xin tư vấn sản phẩm',
  'Báo lỗi giao hàng',
  'Yêu cầu đổi trả',
];

export default function NotificationsScreen() {
  const openConversation = (title) => {
    Alert.alert(title, 'Khung chat mẫu đã sẵn sàng để nối với hệ thống chăm sóc khách hàng.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name='notifications-outline' size={24} color={colors.primary} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Thông báo và nhắn tin với shop</Text>
            <Text style={styles.heroSubtitle}>
              Theo dõi phản hồi từ chăm sóc khách hàng, cập nhật đơn hàng và các tin nhắn hỗ trợ quan trọng.
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryAction} activeOpacity={0.9} onPress={() => openConversation('Shop chăm sóc khách hàng')}>
          <Ionicons name='chatbubble-ellipses-outline' size={20} color='#fff' />
          <Text style={styles.primaryActionText}>Nhắn shop chăm sóc khách hàng</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Hỗ trợ nhanh</Text>
        <View style={styles.quickGrid}>
          {quickHelp.map((item) => (
            <TouchableOpacity key={item} activeOpacity={0.9} style={styles.quickCard} onPress={() => openConversation(item)}>
              <Text style={styles.quickCardText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Tin nhắn gần đây</Text>
        <View style={styles.listCard}>
          {conversations.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={[styles.messageRow, index === conversations.length - 1 && styles.lastRow]}
              onPress={() => openConversation(item.title)}
            >
              <View style={styles.messageIcon}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.messageText}>
                <View style={styles.messageTop}>
                  <Text style={styles.messageTitle}>{item.title}</Text>
                  <Text style={styles.messageTime}>{item.time}</Text>
                </View>
                <Text numberOfLines={2} style={styles.messageSubtitle}>{item.subtitle}</Text>
              </View>
              {item.unread ? (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
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
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FDE8E8',
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
    marginBottom: 4,
  },
  heroSubtitle: {
    color: colors.muted,
    lineHeight: 20,
  },
  primaryAction: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  primaryActionText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickCardText: {
    color: colors.text,
    fontWeight: '700',
    lineHeight: 18,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  messageIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FDE8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    flex: 1,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  messageTitle: {
    flex: 1,
    color: colors.text,
    fontWeight: '800',
  },
  messageTime: {
    color: colors.muted,
    fontSize: 12,
  },
  messageSubtitle: {
    color: colors.muted,
    lineHeight: 18,
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
});
