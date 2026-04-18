import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import {
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  MessageSquare,
  ChevronRight,
} from 'lucide-react-native';

function Card({ children, style = {} }: any) {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 18,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function QuickAction({ icon: Icon, label, bgColor, iconColor }: any) {
  return (
    <TouchableOpacity style={{ width: '23%', alignItems: 'center' }}>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={22} color={iconColor} />
      </View>
      <Text style={{ marginTop: 8, fontSize: 11, color: '#374151', textAlign: 'center' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Dashboard() {
  const stats = [
    {
      label: 'Продажи сегодня',
      value: '127 450 ₽',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#16a34a',
      bgColor: '#f0fdf4',
    },
    {
      label: 'Заказы',
      value: '47',
      change: '+8.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: '#2563eb',
      bgColor: '#eff6ff',
    },
    {
      label: 'Товары в наличии',
      value: '234',
      change: '-5 шт',
      trend: 'down',
      icon: Package,
      color: '#9333ea',
      bgColor: '#faf5ff',
    },
    {
      label: 'Требуют внимания',
      value: '12',
      change: '3 новых',
      trend: 'alert',
      icon: AlertCircle,
      color: '#ea580c',
      bgColor: '#fff7ed',
    },
  ];

  const recentAlerts = [
    { id: 1, message: 'Заканчивается товар: Кроссовки Nike Air Max', time: '15 мин назад', platform: 'WB' },
    { id: 2, message: 'Конкурент снизил цену на -15%', time: '1 час назад', platform: 'Ozon' },
    { id: 3, message: 'Новый отзыв на товар (4 звезды)', time: '2 часа назад', platform: 'WB' },
  ];

  const topProducts = [
    { id: 1, name: 'Кроссовки Nike Air Max', sales: 23, revenue: '45 670 ₽', platform: 'WB' },
    { id: 2, name: 'Футболка Adidas Original', sales: 18, revenue: '27 540 ₽', platform: 'Ozon' },
    { id: 3, name: 'Куртка The North Face', sales: 12, revenue: '89 940 ₽', platform: 'WB' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }} contentContainerStyle={{ paddingBottom: 24 }}>
      <View
        style={{
          backgroundColor: '#7c3aed',
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 18,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>WB Dashboard</Text>
            <Text style={{ color: '#ddd6fe', marginTop: 4, fontSize: 13 }}>Управление продажами и товарами</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.18)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 14,
            backgroundColor: '#fff',
            borderRadius: 16,
            paddingHorizontal: 14,
            height: 48,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Search size={18} color="#6b7280" />
          <Text style={{ color: '#9ca3af', fontSize: 14 }}>Поиск товаров, заказов, отчетов</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
        <Card style={{ backgroundColor: '#7c3aed' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MessageSquare size={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>AI Ассистент готов помочь</Text>
              <Text style={{ color: '#ddd6fe', fontSize: 13, marginTop: 2 }}>
                Спроси про продажи, остатки, рекламу или прибыль
              </Text>
            </View>
          </View>
        </Card>

        <View style={{ marginTop: 14, flexDirection: 'row', justifyContent: 'space-between' }}>
          <QuickAction icon={ShoppingCart} label="Заказы" bgColor="#eff6ff" iconColor="#2563eb" />
          <QuickAction icon={Package} label="Склад" bgColor="#f0fdf4" iconColor="#16a34a" />
          <QuickAction icon={TrendingUp} label="Реклама" bgColor="#faf5ff" iconColor="#9333ea" />
          <QuickAction icon={AlertCircle} label="Отзывы" bgColor="#fff7ed" iconColor="#ea580c" />
        </View>

        <View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>Ключевые показатели</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#7c3aed', fontSize: 13, fontWeight: '600' }}>Все</Text>
            <ChevronRight size={14} color="#7c3aed" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            const trendColor = stat.trend === 'up' ? '#16a34a' : stat.trend === 'down' ? '#dc2626' : '#ea580c';

            return (
              <Card key={stat.label} style={{ width: '48%', padding: 14 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: stat.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={stat.color} />
                  </View>
                  {stat.trend === 'up' ? (
                    <TrendingUp size={18} color="#16a34a" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown size={18} color="#dc2626" />
                  ) : null}
                </View>

                <Text style={{ fontSize: 12, color: '#6b7280' }}>{stat.label}</Text>
                <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginTop: 4 }}>{stat.value}</Text>
                <Text style={{ fontSize: 12, color: trendColor, marginTop: 4 }}>{stat.change}</Text>
              </Card>
            );
          })}
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 }}>
            Важные уведомления
          </Text>

          <View style={{ gap: 10 }}>
            {recentAlerts.map((alert) => (
              <Card key={alert.id} style={{ paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  <AlertCircle size={16} color="#ea580c" style={{ marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, color: '#111827' }}>{alert.message}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>{alert.time}</Text>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 999,
                          backgroundColor: alert.platform === 'WB' ? '#f3e8ff' : '#dbeafe',
                        }}
                      >
                        <Text style={{ fontSize: 11, fontWeight: '700', color: alert.platform === 'WB' ? '#7e22ce' : '#1d4ed8' }}>
                          {alert.platform}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 }}>
            Топ товары сегодня
          </Text>

          <View style={{ gap: 10 }}>
            {topProducts.map((product, index) => (
              <Card key={product.id} style={{ paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 32, height: 32, borderRadius: 999, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: '800', color: '#7c3aed' }}>#{index + 1}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }} numberOfLines={1}>
                      {product.name}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                      <Text style={{ fontSize: 12, color: '#4b5563' }}>{product.sales} продаж</Text>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#16a34a' }}>{product.revenue}</Text>
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 999,
                          backgroundColor: product.platform === 'WB' ? '#f3e8ff' : '#dbeafe',
                        }}
                      >
                        <Text style={{ fontSize: 11, fontWeight: '700', color: product.platform === 'WB' ? '#7e22ce' : '#1d4ed8' }}>
                          {product.platform}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}