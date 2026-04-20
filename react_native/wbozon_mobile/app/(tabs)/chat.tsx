import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Send, Bot, User, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я ваш AI-помощник для Wildberries и Ozon. Могу помочь с анализом продаж, оптимизацией цен, управлением товарами и стратегией продвижения. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'Как увеличить продажи?',
    'Анализ конкурентов',
    'Оптимизация цен',
    'Стратегия продвижения',
  ];

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Симуляция AI ответа
    setTimeout(() => {
      const responses = [
        'Основываясь на анализе ваших продаж, рекомендую:\n\n1. Увеличить рекламный бюджет на топ-3 товара на 20%\n2. Оптимизировать описания товаров с высоким CTR\n3. Запустить акцию на товары с низкой конверсией\n\nХотите подробности по каждому пункту?',
        'Я проанализировал данные за последнюю неделю:\n\n• Средний чек вырос на 8%\n• Конверсия снизилась на 3%\n• 5 товаров требуют пополнения запасов\n\nЧто хотите разобрать подробнее?',
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.role === 'user' && styles.userRow]}>
      {/* Avatar */}
      <LinearGradient
        colors={item.role === 'user' ? ['#8b5cf6', '#a78bfa'] : ['#8b5cf6', '#7c3aed']}
        style={styles.avatar}
      >
        {item.role === 'user' ? <User size={16} color="#fff" /> : <Bot size={16} color="#fff" />}
      </LinearGradient>

      {/* Message */}
      <View style={[styles.messageContainer, item.role === 'user' && styles.userMessage]}>
        <View style={[styles.bubble, item.role === 'user' && styles.userBubble]}>
          <Text style={[styles.messageText, item.role === 'user' && styles.userText]}>
            {item.content.split('\n').map((line, index) => (
              <Text key={index} style={styles.messageText}>
                {line}
                {'\n'}
              </Text>
            ))}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderTyping = () => (
    <View style={styles.messageRow}>
      <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.avatar}>
        <Bot size={16} color="#fff" />
      </LinearGradient>
      <View style={styles.messageContainer}>
        <View style={styles.bubble}>
          <View style={styles.typingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isTyping ? renderTyping : <View style={{ height: 20 }} />}
      />

      {/* Quick Questions (только первое сообщение) */}
      {messages.length <= 1 && (
        <View style={styles.quickQuestions}>
          <View style={styles.quickHeader}>
            <Sparkles size={16} color="#8b5cf6" />
            <Text style={styles.quickTitle}>Быстрые вопросы:</Text>
          </View>
          <View style={styles.quickButtons}>
            {quickQuestions.map(question => (
              <TouchableOpacity
                key={question}
                style={styles.quickButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickButtonText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Задайте вопрос..."
          multiline
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendButton, (!input.trim() || isTyping) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!input.trim() || isTyping}
        >
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  messagesContainer: { padding: 16, paddingBottom: 100, flexGrow: 1 },
  messageRow: { 
    flexDirection: 'row', 
    marginBottom: 16, 
    alignItems: 'flex-start' 
  },
  userRow: { flexDirection: 'row-reverse' },
  avatar: {
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  messageContainer: { flex: 1, maxWidth: '80%', marginLeft: 8 },
  userMessage: { marginRight: 8 },
  bubble: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userBubble: {
    backgroundColor: '#8b5cf6',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#374151',
  },
  userText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
    marginLeft: 2,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  dot1: { transform: [{ translateY: -2 }], animationDelay: '0ms' },
  dot2: { transform: [{ translateY: -1 }], animationDelay: '150ms' },
  dot3: { animationDelay: '300ms' },
  quickQuestions: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  quickButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickButtonText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
});