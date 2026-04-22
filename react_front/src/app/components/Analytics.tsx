import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState, useEffect } from "react";

export default function Analytics() {
  const [period, setPeriod] = useState('week');
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // 🔥 Загрузка реальных данных с твоего API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Твой endpoint /api/sales?period={period}
        const res = await fetch(`/api/sales?period=${period}`);
        const data = await res.json();
        setApiData(data);
      } catch (err) {
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

  const getMockData = () => {  // Пока API не готов — мок данные
    const weekData = [
      { date: "Пн", wb: 45000, ozon: 32000 },
      { date: "Вт", wb: 52000, ozon: 38000 },
      { date: "Ср", wb: 48000, ozon: 35000 },
      { date: "Чт", wb: 61000, ozon: 42000 },
      { date: "Пт", wb: 55000, ozon: 45000 },
      { date: "Сб", wb: 67000, ozon: 52000 },
      { date: "Вс", wb: 58000, ozon: 48000 },
    ];

    const monthData = Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1}`,
      wb: 45000 + Math.random() * 30000,
      ozon: 32000 + Math.random() * 20000
    }));

    const labels = {
      week: "7 дней",
      month: "30 дней",
      quarter: "90 дней",
      year: "Год",
      all: "Всё время"
    };

    return {
      data: period === 'week' ? weekData : monthData.slice(0, period === 'month' ? 30 : 90),
      periodLabel: labels[period],
      totalSales: 0,  // из API
      totalOrders: 0, // из API
      avgCheck: 0     // из API
    };
  };

  const salesData = apiData?.sales || getMockData().data;
  const periodLabel = apiData?.periodLabel || getMockData().periodLabel;
  const totalSales = apiData?.totalSales || salesData.reduce((sum, d) => sum + d.wb + d.ozon, 0);
  const ordersData = salesData.map((item) => ({
    date: item.date,
    orders: 30 + Math.floor(Math.random() * 30)
  }));

  const categoryData = [
    { category: "Обувь", sales: 156000 },
    { category: "Одежда", sales: 124000 },
    { category: "Аксессуары", sales: 89000 },
    { category: "Спорт", sales: 67000 },
  ];

  if (loading) return <div className="p-4 text-center">Загрузка аналитики...</div>;

  return (
    <div className="p-4 space-y-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Аналитика продаж</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Период:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          >
            <option value="week">7 дней</option>
            <option value="month">30 дней</option>
            <option value="quarter">90 дней</option>
            <option value="year">Год</option>
            <option value="all">Всё время</option>
          </select>
          <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
            {periodLabel}
          </span>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm rounded-xl p-1">
          <TabsTrigger value="sales" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg">Продажи</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg">Заказы</TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-lg">Категории</TabsTrigger>
        </TabsList>

        {/* 📊 Продажи */}
        <TabsContent value="sales" className="space-y-4">
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Выручка по платформам ({periodLabel})</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1e3}к`} />
                <Tooltip
                  contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value.toLocaleString()} ₽`, 'Выручка']}
                />
                <Legend />
                <Bar dataKey="wb" fill="#9333ea" name="Wildberries" radius={[6, 6, 0, 0]} />
                <Bar dataKey="ozon" fill="#3b82f6" name="Ozon" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 text-center shadow-sm border-0 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Общая выручка</p>
              <p className="text-3xl font-bold text-gray-900">{totalSales.toLocaleString()} ₽</p>
              <p className="text-sm text-emerald-600 font-medium mt-1">+15.3% к прошлому периоду</p>
            </Card>
            <Card className="p-6 text-center shadow-sm border-0 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Заказов</p>
              <p className="text-3xl font-bold text-gray-900">
                {ordersData.reduce((a, b) => a + b.orders, 0)}
              </p>
              <p className="text-sm text-emerald-600 font-medium mt-1">+8.2%</p>
            </Card>
            <Card className="p-6 text-center shadow-sm border-0 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Средний чек</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(totalSales / ordersData.reduce((a, b) => a + b.orders, 0)).toLocaleString()} ₽
              </p>
              <p className="text-sm text-emerald-600 font-medium mt-1">+4.1%</p>
            </Card>
          </div>
        </TabsContent>

        {/* 📈 Заказы */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Динамика заказов ({periodLabel})</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* 🏷️ Категории */}
        <TabsContent value="categories" className="space-y-4">
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Топ категорий по выручке</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical" margin={{ right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1e3}к`} />
                <YAxis dataKey="category" type="category" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} ₽`, 'Выручка']} />
                <Bar dataKey="sales" fill="#f59e0b" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}