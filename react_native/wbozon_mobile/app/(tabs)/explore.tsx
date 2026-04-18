import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  AlertCircle,
  MessageSquare,
} from 'lucide-react-native';

function Card({ children, style = {} }: any) {
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.06,
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
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16, backgroundColor: '#f8fafc' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          const trendColor =
            stat.trend === 'up' ? '#16a34a' : stat.trend === 'down' ? '#dc2626' : '#ea580c';

          return (
            <Card key={stat.label} style={{ width: '48%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: stat.bgColor, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={stat.color} />
                </View>

                {stat.trend === 'up' ? (
                  <TrendingUp size={18} color="#16a34a" />
                ) : stat.trend === 'down' ? (
                  <TrendingDown size={18} color="#dc2626" />
                ) : null}
              </View>

              <Text style={{ fontSize: 12, color: '#4b5563' }}>{stat.label}</Text>
              <Text style={{ fontSize: 22, fontWeight: '700', color: '#111827', marginTop: 4 }}>{stat.value}</Text>
              <Text style={{ fontSize: 12, color: trendColor, marginTop: 4 }}>{stat.change}</Text>
            </Card>
          );
        })}
      </View>

      <Card style={{ backgroundColor: '#7c3aed' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={24} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
              AI Ассистент готов помочь
            </Text>
            <Text style={{ color: '#ddd6fe', fontSize: 13 }}>
              Задайте вопрос о продажах, товарах или стратегии
            </Text>
          </View>
        </View>
      </Card>

      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
          Важные уведомления
        </Text>

        <View style={{ gap: 8 }}>
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
                      <Text
                        style={{
                          fontSize: 11,
                          color: alert.platform === 'WB' ? '#7e22ce' : '#1d4ed8',
                          fontWeight: '600',
                        }}
                      >
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

      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
          Топ товары сегодня
        </Text>

        <View style={{ gap: 8 }}>
          {topProducts.map((product, index) => (
            <Card key={product.id} style={{ paddingVertical: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 32, height: 32, borderRadius: 999, backgroundColor: '#f3e8ff', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#7e22ce' }}>#{index + 1}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }} numberOfLines={1}>
                    {product.name}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}>
                    <Text style={{ fontSize: 12, color: '#4b5563' }}>{product.sales} продаж</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#16a34a' }}>{product.revenue}</Text>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 999,
                        backgroundColor: product.platform === 'WB' ? '#f3e8ff' : '#dbeafe',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: product.platform === 'WB' ? '#7e22ce' : '#1d4ed8',
                          fontWeight: '600',
                        }}
                      >
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

      <TouchableOpacity
        style={{
          backgroundColor: '#ef4444',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Поменять картинку</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}