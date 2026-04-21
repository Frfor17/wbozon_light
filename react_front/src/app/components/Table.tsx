import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { AlertCircle } from "lucide-react";

interface WBProductRow {
    product_id: number;
    nm_id: number;
    wb_product_name: string;
    brand_name: string;
    category_name: string;
    supplier_name: string | null;
    total_stock: number;
    avg_price: number;
    total_orders: number;
    total_revenue: number;
    first_image: string | null;
}

export default function DataTable() {
    const [data, setData] = useState<WBProductRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // ✅ endpoint Для приём данных мультитабличного запроса
        fetch("http://localhost:8000/api/multi-table-data")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((result: WBProductRow[]) => {
                console.log("🟢 Получены данные:", result);  // ← ДОБАВЬ ЭТО
                console.log("🟢 Длина массива:", result.length);  // ← И ЭТО
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // ... loading и error остаются ТЕМ ЖЕ

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Топ-10 продуктов WB</h1>
                <div className="text-sm text-gray-500">
                    {data.length} из 10 записей
                </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Продукт
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Бренд
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Категория
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Остаток
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ср. цена
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Заказы
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Выручка
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row) => (
                                <tr key={row.product_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 max-w-xs truncate">
                                            {row.wb_product_name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            NM ID: {row.nm_id} {row.supplier_name && `| ${row.supplier_name}`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full">
                                            {row.brand_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.category_name}
                                    </td>
                                    {/* ✅ ИСПРАВЛЕННЫЕ числа */}
                                    <td className={`px-6 py-4 text-right font-medium text-sm flex items-center justify-end gap-1 ${(row.total_stock || 0) > 100 ? 'text-green-600' :
                                            (row.total_stock || 0) > 10 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {(row.total_stock || 0).toLocaleString()}
                                        {(row.total_stock || 0) === 0 && <AlertCircle className="size-4" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                        ₽{(row.avg_price || 0).toLocaleString('ru-RU', { minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-600">
                                        {(row.total_orders || 0).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                                        ₽{(row.total_revenue || 0).toLocaleString('ru-RU')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}