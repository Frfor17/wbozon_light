import React from 'react';
import { Dimensions, TouchableOpacity, View, Text, Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
  strokeWidth: 2,
};

const salesData = {
  labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  datasets: [
    { data: [45, 52, 48, 61, 55, 67, 58] }
  ]
};

export default function AnalyticsScreen() {
  const handlePress = async () => {
    try {
      await fetch('https://example.com/api/change-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: true,
        }),
      });

      Alert.alert('OK', 'POST отправлен');
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось отправить запрос');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Аналитика</Text>

      <View style={{ marginTop: 16 }}>
        <BarChart
          data={salesData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          showValuesOnTopOfBars
        />
      </View>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#ef4444', padding: 16, borderRadius: 8 }}
          onPress={handlePress}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Поменять картинку</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}