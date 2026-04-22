import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, AlertCircle, MessageSquare } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [salesToday, setSalesToday] = useState<number | null>(null);
  const [ordersCounts, setOrdersCounts] = useState<number | null>(null);
  const [goodsAvailable, setgoodsAvailable] = useState<number | null>(null);
  const [needsAttention, setneedsAttention] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/products-count")
      .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
      })
      .then((data) => {
      console.log("API data:", data); // тут должно быть {count: 1}
      setSalesToday(data.count);
      })
      .catch((err) => {
      console.error("Fetch error:", err);
      });
  }, []);

  const stats = [
    {
      label: "Продажи сегодня",
      value: salesToday != null ? salesToday : "—",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Заказы",
      value: "47",
      change: "+8.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Товары в наличии",
      value: "234",
      change: "-5 шт",
      trend: "down",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Требуют внимания",
      value: "12",
      change: "3 новых",
      trend: "alert",
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentAlerts = [
    { id: 1, type: "stock", message: "Заканчивается товар: Кроссовки Nike Air Max", time: "15 мин назад", platform: "WB" },
    { id: 2, type: "price", message: "Конкурент снизил цену на -15%", time: "1 час назад", platform: "Ozon" },
    { id: 3, type: "review", message: "Новый отзыв на товар (4 звезды)", time: "2 часа назад", platform: "WB" },
  ];

  const topProducts = [
    { id: 1, name: "Кроссовки Nike Air Max", sales: 23, revenue: "45 670 ₽", platform: "WB" },
    { id: 2, name: "Футболка Adidas Original", sales: 18, revenue: "27 540 ₽", platform: "Ozon" },
    { id: 3, name: "Куртка The North Face", sales: 12, revenue: "89 940 ₽", platform: "WB" },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 border-0 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`size-4 ${stat.color}`} />
                </div>
                {stat.trend === "up" && (
                  <TrendingUp className="size-4 text-green-600" />
                )}
                {stat.trend === "down" && (
                  <TrendingDown className="size-4 text-red-600" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className={`text-xs ${
                  stat.trend === "up" ? "text-green-600" : 
                  stat.trend === "down" ? "text-red-600" : 
                  "text-orange-600"
                }`}>
                  {stat.change}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Assistant Quick Access */}
      <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-md text-white">
        <div className="flex items-center gap-3">
          <div className="size-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MessageSquare className="size-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">AI Ассистент готов помочь</h3>
            <p className="text-sm text-purple-100">Задайте вопрос о продажах, товарах или стратегии</p>
          </div>
        </div>
      </Card>

      {/* Recent Alerts */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Важные уведомления</h2>
        <div className="space-y-2">
          {recentAlerts.map((alert) => (
            <Card key={alert.id} className={`p-3 border-0 shadow-sm ${alert.type === "stock" ? "bg-red-50/80 border-l-4 border-red-400" : ""}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`size-4 p-1 rounded-full ring-2 ${alert.type === "stock" ? "text-red-600 ring-red-300 bg-red-100" : "text-orange-600 ring-orange-300 bg-orange-100"} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      alert.platform === "WB" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {alert.platform}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Топ товары сегодня</h2>
        <div className="space-y-2">
          {topProducts.map((product, index) => (
            <Card key={alert.id as any} className={`p-3 border-0 shadow-sm ${(alert as any).type === "stock" ? "bg-red-50" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-purple-700">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-600">{product.sales} продаж</span>
                    <span className="text-xs font-medium text-green-600">{product.revenue}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      product.platform === "WB" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {product.platform}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}