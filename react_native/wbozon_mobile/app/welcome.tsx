import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, ArrowRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Bot size={40} color="#fff" />
        </View>

        <Text style={styles.title}>Welcome to Your AI Assistant</Text>

        <Text style={styles.subtitle}>
          Intelligent automation for Wildberries and Ozon sellers.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/setup')}>
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center' },
  iconWrap: { width: 80, height: 80, borderRadius: 999, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#1e1b4b', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, lineHeight: 24, color: '#4b5563', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#4f46e5', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});