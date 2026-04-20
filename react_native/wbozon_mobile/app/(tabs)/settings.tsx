import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import { Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState([
    { label: 'Уведомления о заказах', enabled: true },
    { label: 'Низкий остаток товаров', enabled: true },
    { label: 'Изменения цен конкурентов', enabled: false },
    { label: 'Новые отзывы', enabled: true },
  ]);

  const toggleNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications[index].enabled = !newNotifications[index].enabled;
    setNotifications(newNotifications);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    router.replace('/welcome');
  };

  const platforms = [
    { iconColor: '#8b5cf6', label: 'Wildberries', value: 'Подключено' },
    { iconColor: '#3b82f6', label: 'Ozon', value: 'Подключено' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subtitle}>Управление аккаунтом и уведомлениями</Text>
      </View>

      {/* Profile Card */}
      <LinearGradient
        colors={['#8b5cf6', '#a78bfa']}
        style={styles.profileCard}
      >
        <View style={styles.profileContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ИП</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>ИП Иванов А.С.</Text>
            <Text style={styles.profileEmail}>seller@example.com</Text>
            <Text style={styles.profileId}>ID: 123456789</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Platforms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Подключенные платформы</Text>
        <View style={styles.card}>
          {platforms.map((platform, index) => (
            <TouchableOpacity key={index} style={styles.listItem}>
              <View style={styles.platformRow}>
                <View style={[styles.platformIcon, { backgroundColor: platform.iconColor + '20' }]}>
                  <Text style={[styles.platformEmoji, { color: platform.iconColor }]}>●</Text>
                </View>
                <View>
                  <Text style={styles.platformLabel}>{platform.label}</Text>
                  <Text style={styles.platformValue}>{platform.value}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color="#374151" />
          <Text style={styles.sectionTitle}>Уведомления</Text>
        </View>
        <View style={styles.card}>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.switchRow}>
              <Text style={styles.switchLabel}>{notification.label}</Text>
              <Switch
                value={notification.enabled}
                onValueChange={() => toggleNotification(index)}
                trackColor={{ true: '#8b5cf6' }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Other Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Другое</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.iconRow}>
              <Shield size={20} color="#6b7280" />
              <Text style={styles.listLabel}>Безопасность</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.iconRow}>
              <Globe size={20} color="#6b7280" />
              <Text style={styles.listLabel}>Язык и регион</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.iconRow}>
              <HelpCircle size={20} color="#6b7280" />
              <Text style={styles.listLabel}>Помощь и поддержка</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e1b4b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    marginBottom: 2,
  },
  profileId: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e1b4b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformEmoji: {
    fontSize: 20,
    fontWeight: '700',
  },
  platformLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e1b4b',
    marginBottom: 2,
  },
  platformValue: {
    fontSize: 14,
    color: '#8b5cf6',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1e1b4b',
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  listLabel: {
    fontSize: 16,
    color: '#1e1b4b',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fee2e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});