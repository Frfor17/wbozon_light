import { View, Text, TouchableOpacity } from 'react-native';
import { Home, MessageSquare, Package, BarChart3, Settings } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export default function CustomTabBar({ state, descriptors, navigation }) {
    const pathname = usePathname();

    const tabs = [
        { name: 'index', icon: Home, label: 'Главная' },
        { name: 'chat', icon: MessageSquare, label: 'Ассистент' },
        { name: 'products', icon: Package, label: 'Товары' },
        { name: 'analytics', icon: BarChart3, label: 'Аналитика' },
        { name: 'settings', icon: Settings, label: 'Настройки' },
    ];

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingBottom: 20 }}>
            {tabs.map((tab, index) => {
                const isFocused = state.index === index;
                const Icon = tab.icon;
                return (
                    <View key={tab.name} style={{ flex: 1, alignItems: 'center', padding: 8 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(tab.name)}
                            style={{
                                alignItems: 'center',
                                padding: 8,
                                borderRadius: 12,
                                backgroundColor: isFocused ? '#f3e8ff' : 'transparent',
                            }}
                        >
                            <Icon size={20} color={isFocused ? '#8b5cf6' : '#9ca3af'} />
                            <Text style={{ fontSize: 10, color: isFocused ? '#8b5cf6' : '#9ca3af', marginTop: 4 }}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}