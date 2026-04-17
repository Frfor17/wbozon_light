import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Analytics() {
  const salesData = [
    { date: "Пн", wb: 45000, ozon: 32000 },
    { date: "Вт", wb: 52000, ozon: 38000 },
    { date: "Ср", wb: 48000, ozon: 35000 },
    { date: "Чт", wb: 61000, ozon: 42000 },
    { date: "Пт", wb: 55000, ozon: 45000 },
    { date: "Сб", wb: 67000, ozon: 52000 },
    { date: "Вс", wb: 58000, ozon: 48000 },
  ];

  const ordersData = [
    { date: "Пн", orders: 34 },
    { date: "Вт", orders: 42 },
    { date: "Ср", orders: 38 },
    { date: "Чт", orders: 51 },
    { date: "Пт", orders: 45 },
    { date: "Сб", orders: 58 },
    { date: "Вс", orders: 47 },
  ];

  const categoryData = [
    { category: "Обувь", sales: 156000 },
    { category: "Одежда", sales: 124000 },
    { category: "Аксессуары", sales: 89000 },
    { category: "Спорт", sales: 67000 },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Аналитика</h1>
        <p className="text-sm text-gray-600">Данные за последние 7 дней</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="categories">Категории</TabsTrigger>
        </TabsList>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card className="p-4 border-0 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Динамика продаж по платформам</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} ₽`}
                />
                <Bar dataKey="wb" fill="#9333ea" name="Wildberries" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ozon" fill="#3b82f6" name="Ozon" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 border-0 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Всего продаж</p>
              <p className="text-2xl font-semibold text-gray-900">386k ₽</p>
              <p className="text-xs text-green-600 mt-1">+15.3% к прошлой неделе</p>
            </Card>
            <Card className="p-4 border-0 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Средний чек</p>
              <p className="text-2xl font-semibold text-gray-900">1 234 ₽</p>
              <p className="text-xs text-green-600 mt-1">+8.7% к прошлой неделе</p>
            </Card>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="p-4 border-0 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Количество заказов</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  dot={{ fill: '#9333ea', r: 4 }}
                  name="Заказы"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Order Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 border-0 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Всего заказов</p>
              <p className="text-2xl font-semibold text-gray-900">315</p>
              <p className="text-xs text-green-600 mt-1">+22.1% к прошлой неделе</p>
            </Card>
            <Card className="p-4 border-0 shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Конверсия</p>
              <p className="text-2xl font-semibold text-gray-900">3.8%</p>
              <p className="text-xs text-red-600 mt-1">-0.4% к прошлой неделе</p>
            </Card>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card className="p-4 border-0 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Продажи по категориям</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <YAxis 
                  type="category"
                  dataKey="category" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => `${value.toLocaleString()} ₽`}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#9333ea" 
                  name="Продажи"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Category */}
          <Card className="p-4 border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
            <p className="text-xs text-purple-700 mb-1">Лучшая категория</p>
            <p className="text-xl font-semibold text-purple-900">Обувь</p>
            <p className="text-sm text-purple-700 mt-1">156 000 ₽ • 35.8% от всех продаж</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
