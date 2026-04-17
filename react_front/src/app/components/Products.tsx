import { useState } from "react";
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  sales: number;
  revenue: number;
  platform: "WB" | "Ozon";
  status: "active" | "low-stock" | "out-of-stock";
  trend: "up" | "down" | "neutral";
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  const products: Product[] = [
    {
      id: 1,
      name: "Кроссовки Nike Air Max 270",
      sku: "WB-12345",
      price: 8990,
      stock: 15,
      sales: 23,
      revenue: 206770,
      platform: "WB",
      status: "active",
      trend: "up",
    },
    {
      id: 2,
      name: "Футболка Adidas Original",
      sku: "OZ-67890",
      price: 1990,
      stock: 45,
      sales: 18,
      revenue: 35820,
      platform: "Ozon",
      status: "active",
      trend: "up",
    },
    {
      id: 3,
      name: "Куртка The North Face",
      sku: "WB-24680",
      price: 12990,
      stock: 3,
      sales: 8,
      revenue: 103920,
      platform: "WB",
      status: "low-stock",
      trend: "neutral",
    },
    {
      id: 4,
      name: "Джинсы Levi's 501",
      sku: "OZ-13579",
      price: 5990,
      stock: 0,
      sales: 12,
      revenue: 71880,
      platform: "Ozon",
      status: "out-of-stock",
      trend: "down",
    },
    {
      id: 5,
      name: "Рюкзак Fjällräven Kånken",
      sku: "WB-97531",
      price: 6990,
      stock: 28,
      sales: 15,
      revenue: 104850,
      platform: "WB",
      status: "active",
      trend: "up",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Активен</Badge>;
      case "low-stock":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Мало</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Нет в наличии</Badge>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Товары</h1>
        <p className="text-sm text-gray-600">Всего товаров: {products.length}</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск товаров..."
            className="pl-9 border-gray-300"
          />
        </div>
        <Button variant="outline" className="border-gray-300">
          <Filter className="size-4" />
        </Button>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-4 border-0 shadow-sm">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{product.sku}</p>
                </div>
                <div className="flex items-center gap-2">
                  {product.trend === "up" && <TrendingUp className="size-4 text-green-600" />}
                  {product.trend === "down" && <TrendingDown className="size-4 text-red-600" />}
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.platform === "WB" 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {product.platform}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Цена</p>
                  <p className="font-semibold text-gray-900">{product.price.toLocaleString()} ₽</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Продажи</p>
                  <p className="font-semibold text-gray-900">{product.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-0.5">Выручка</p>
                  <p className="font-semibold text-gray-900">{(product.revenue / 1000).toFixed(0)}k ₽</p>
                </div>
              </div>

              {/* Stock and Status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {product.status !== "active" && (
                    <AlertTriangle className="size-4 text-orange-600" />
                  )}
                  <span className="text-sm text-gray-700">
                    Остаток: <span className="font-medium">{product.stock} шт</span>
                  </span>
                </div>
                {getStatusBadge(product.status)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Товары не найдены</p>
        </div>
      )}
    </div>
  );
}
