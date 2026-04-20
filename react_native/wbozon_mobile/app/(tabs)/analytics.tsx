import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
// import { Feather } from '@expo/vector-icons';
import { BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Period = 7 | 30 | 90;

interface SalesData {
  date: string;
  wb: number;
  ozon: number;
}

interface OrdersData {
  date: string;
  orders: number;
}

interface CategoryData {
  category: string;
  sales: number;
}

export default function Analytics() {
  const [period, setPeriod] = useState<Period>(7);
  const [activeTab, setActiveTab] = useState<'sales' | 'orders' | 'categories'>('sales');

  const generateSalesData = (days: number): SalesData[] => {
    const data: SalesData[] = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
      data.push({
        date: dateStr,
        wb: Math.floor(Math.random() * 30000) + 40000,
        ozon: Math.floor(Math.random() * 25000) + 30000,
      });
    }
    return data;
  };

  const generateOrdersData = (days: number): OrdersData[] => {
    const data: OrdersData[] = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
      data.push({
        date: dateStr,
        orders: Math.floor(Math.random() * 30) + 30,
      });
    }
    return data;
  };

  const salesData = generateSalesData(period);
  const ordersData = generateOrdersData(period);
  const categoryData: CategoryData[] = [
    { category: "Обувь", sales: 156000 },
    { category: "Одежда", sales: 124000 },
    { category: "Аксессуары", sales: 89000 },
    { category: "Спорт", sales: 67000 },
  ];

  const renderBarChart = (data: SalesData[]) => (
    <View style={styles.chartContainer}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chartList}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.barItem}>
            <View style={styles.dateLabel}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.bars}>
              <View style={[styles.bar, styles.wbBar, { height: `${Math.min(item.wb / 800, 100)}%` }]} />
              <View style={[styles.bar, styles.ozonBar, { height: `${Math.min(item.ozon / 800, 100)}%` }]} />
            </View>
            <View style={styles.values}>
              <Text style={styles.valueText}>{(item.wb / 1000).toFixed(0)}k</Text>
              <Text style={styles.valueText}>{(item.ozon / 1000).toFixed(0)}k</Text>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderLineChart = (data: OrdersData[]) => (
    <View style={styles.chartContainer}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chartList}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.lineItem}>
            <View style={styles.dateLabel}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={[styles.lineDot, { bottom: `${Math.min(item.orders / 1.5, 80)}%` }]}>
              <Text style={styles.dotValue}>{item.orders}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderVerticalBarChart = () => (
    <View style={styles.verticalChart}>
      {categoryData.map((item, index) => (
        <View key={index} style={styles.vBarItem}>
          <Text style={styles.vCategory}>{item.category}</Text>
          <View style={styles.vBarContainer}>
            <View style={[styles.vBar, { width: `${Math.min(item.sales / 5000, 90)}%` }]} />
          </View>
          <Text style={styles.vValue}>{(item.sales / 1000).toFixed(0)}k</Text>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sales':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Динамика продаж по платформам</Text>
              {renderBarChart(salesData)}
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Всего продаж</Text>
                <Text style={styles.summaryValue}>386k ₽</Text>
                <Text style={styles.summaryChange}>+15.3%</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Средний чек</Text>
                <Text style={styles.summaryValue}>1 234 ₽</Text>
                <Text style={styles.summaryChange}>+8.7%</Text>
              </View>
            </View>
          </View>
        );
      case 'orders':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Количество заказов</Text>
              {renderLineChart(ordersData)}
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Всего заказов</Text>
                <Text style={styles.summaryValue}>315</Text>
                <Text style={styles.summaryChange}>+22.1%</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Конверсия</Text>
                <Text style={styles.summaryValue}>3.8%</Text>
                <Text style={styles.summaryChangeRed}>-0.4%</Text>
              </View>
            </View>
          </View>
        );
      case 'categories':
        return (
          <View style={styles.tabContent}>
            <View style={styles.chartCard}>
              <Text style={styles.chartTitle}>Продажи по категориям</Text>
              {renderVerticalBarChart()}
            </View>
            <View style={[styles.summaryCard, styles.topCategory]}>
              <Text style={styles.summaryLabelTop}>Лучшая категория</Text>
              <Text style={styles.summaryValueTop}>Обувь</Text>
              <Text style={styles.summaryDetail}>156 000 ₽ • 35.8% от всех продаж</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Аналитика</Text>
        <Text style={styles.subtitle}>Данные за последние {period} дней</Text>
      </View>

      <View style={styles.periodRow}>
        {[7, 30, 90].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.periodBtn,
              period === p && styles.periodBtnActive
            ]}
            onPress={() => setPeriod(p as Period)}
          >
            <Text style={[
              styles.periodBtnText,
              period === p && styles.periodBtnTextActive
            ]}>
              {p} дней
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabsRow}>
        {(['sales', 'orders', 'categories'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.tabBtnActive
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabBtnText,
              activeTab === tab && styles.tabBtnTextActive
            ]}>
              {tab === 'sales' ? 'Продажи' : tab === 'orders' ? 'Заказы' : 'Категории'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scrollContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280' },
  periodRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  periodBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  periodBtnActive: {
    backgroundColor: '#9333ea',
    borderColor: '#9333ea',
  },
  periodBtnText: { fontSize: 14, fontWeight: '500', color: '#374151' },
  periodBtnTextActive: { color: '#fff' },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: '#fff' },
  tabBtnText: { fontSize: 14, fontWeight: '500', color: '#6b7280' },
  tabBtnTextActive: { color: '#9333ea', fontWeight: '600' },
  scrollContainer: { flex: 1 },
  tabContent: { gap: 16 },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: { fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 16 },
  chartContainer: { height: 250, justifyContent: 'center' },
  chartList: { paddingVertical: 20, gap: 24 },
  barItem: { width: 80, alignItems: 'center' },
  dateLabel: { position: 'absolute', top: 0, left: '50%', transform: [{ translateX: -40 }] },
  dateText: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
  bars: { height: 160, width: 32, position: 'relative', marginVertical: 20 },
  bar: {
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  wbBar: { backgroundColor: '#9333ea', width: 16, right: 16 },
  ozonBar: { backgroundColor: '#3b82f6', width: 16 },
  values: { flexDirection: 'row', justifyContent: 'space-between', width: 32 },
  valueText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  lineItem: { width: 60, alignItems: 'center', height: 200 },
  lineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  dotValue: { color: '#fff', fontSize: 10, fontWeight: '600' },
  verticalChart: { gap: 12 },
  vBarItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  vCategory: { width: 80, fontSize: 12, color: '#6b7280' },
  vBarContainer: { flex: 1, height: 32, backgroundColor: '#f3f4f6', borderRadius: 6, overflow: 'hidden' },
  vBar: { height: '100%', backgroundColor: '#9333ea', borderRadius: 6 },
  vValue: { width: 50, fontSize: 12, fontWeight: '500', color: '#374151', textAlign: 'right' },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  summaryValue: { fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 4 },
  summaryChange: { fontSize: 12, color: '#10b981' },
  summaryChangeRed: { fontSize: 12, color: '#ef4444' },
  topCategory: {
    backgroundColor: '#faf5ff',
    borderColor: '#e9d5ff',
  },
  summaryLabelTop: { fontSize: 12, color: '#7c3aed', marginBottom: 4 },
  summaryValueTop: { fontSize: 20, fontWeight: '600', color: '#581c87', marginBottom: 4 },
  summaryDetail: { fontSize: 14, color: '#7c3aed' },
});