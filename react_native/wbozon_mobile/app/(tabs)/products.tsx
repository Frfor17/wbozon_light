import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Search, Filter, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

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
        { id: 1, name: "Кроссовки Nike Air Max 270", sku: "WB-12345", price: 8990, stock: 15, sales: 23, revenue: 206770, platform: "WB", status: "active", trend: "up" },
        { id: 2, name: "Футболка Adidas Original", sku: "OZ-67890", price: 1990, stock: 45, sales: 18, revenue: 35820, platform: "Ozon", status: "active", trend: "up" },
        { id: 3, name: "Куртка The North Face", sku: "WB-24680", price: 12990, stock: 3, sales: 8, revenue: 103920, platform: "WB", status: "low-stock", trend: "neutral" },
        { id: 4, name: "Джинсы Levi's 501", sku: "OZ-13579", price: 5990, stock: 0, sales: 12, revenue: 71880, platform: "Ozon", status: "out-of-stock", trend: "down" },
        { id: 5, name: "Рюкзак Fjällräven Kånken", sku: "WB-97531", price: 6990, stock: 28, sales: 15, revenue: 104850, platform: "WB", status: "active", trend: "up" },
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: Product["status"]) => {
        const badges = {
            active: { bg: "#dcfce7", text: "#166534", label: "Активен" },
            "low-stock": { bg: "#fef3c7", text: "#92400e", label: "Мало" },
            "out-of-stock": { bg: "#fee2e2", text: "#991b1b", label: "Нет в наличии" }
        };
        const badge = badges[status];
        return (
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
            </View>
        );
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                        <Text style={styles.sku}>{item.sku}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        {item.trend === "up" && <Feather name="trending-up" size={16} color="#10b981" />}
                        {item.trend === "down" && <Feather name="trending-down" size={16} color="#ef4444" />}
                        <View style={[styles.platformBadge, item.platform === "WB" ? styles.wbBadge : styles.ozonBadge]}>
                            <Text style={[styles.platformText, item.platform === "WB" ? styles.wbText : styles.ozonText]}>
                                {item.platform}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Цена</Text>
                        <Text style={styles.statValue}>{item.price.toLocaleString()} ₽</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Продажи</Text>
                        <Text style={styles.statValue}>{item.sales}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statLabel}>Выручка</Text>
                        <Text style={styles.statValue}>{(item.revenue / 1000).toFixed(0)}k ₽</Text>
                    </View>
                </View>

                {/* Stock */}
                <View style={styles.stockRow}>
                    <View style={styles.stockLeft}>
                        {item.status !== "active" && <Feather name="alert-triangle" size={16} color="#f59e0b" />}
                        <Text style={styles.stockText}>
                            Остаток: <Text style={styles.stockValue}>{item.stock} шт</Text>
                        </Text>
                    </View>
                    {getStatusBadge(item.status)}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Товары</Text>
                <Text style={styles.subtitle}>Всего товаров: {products.length}</Text>
            </View>

            <View style={styles.searchRow}>
                <View style={styles.searchInputContainer}>
                    <Feather name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Поиск товаров..."
                        placeholderTextColor="#9ca3af"
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="filter" size={20} color="#6b7280" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />

            {filteredProducts.length === 0 && (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Товары не найдены</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { marginBottom: 16 },
    title: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 4 },
    subtitle: { fontSize: 14, color: '#6b7280' },
    searchRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#f9fafb',
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, fontSize: 16, color: '#111827' },
    filterBtn: {
        width: 48, height: 48, borderWidth: 1, borderColor: '#d1d5db',
        borderRadius: 8, justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
    },
    listContent: { paddingBottom: 20 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    cardContent: { padding: 16, gap: 12 },
    header: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
    headerLeft: { flex: 1 },
    productName: { fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 4 },
    sku: { fontSize: 12, color: '#6b7280' },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    platformBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    wbBadge: { backgroundColor: '#f3e8ff' },
    ozonBadge: { backgroundColor: '#dbeafe' },
    platformText: { fontSize: 12, fontWeight: '500' },
    wbText: { color: '#7c3aed' },
    ozonText: { color: '#2563eb' },
    statsRow: { flexDirection: 'row', gap: 12 },
    stat: { flex: 1 },
    statLabel: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
    statValue: { fontSize: 16, fontWeight: '600', color: '#111827' },
    stockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    stockLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    stockText: { fontSize: 14, color: '#374151' },
    stockValue: { fontWeight: '500' },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { fontSize: 12, fontWeight: '500' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 },
    emptyText: { fontSize: 16, color: '#6b7280' },
});