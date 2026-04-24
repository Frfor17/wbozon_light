import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  thinking?: string[]; // Новый массив для "мышления"
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Привет! Я ваш AI-помощник для Wildberries и Ozon. Могу помочь с анализом продаж, оптимизацией цен, управлением товарами и стратегией продвижения. Чем могу помочь?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Как увеличить продажи?",
    "Анализ конкурентов",
    "Оптимизация цен",
    "Стратегия продвижения",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // 1. Создаем "thinking" сообщение СРАЗУ
    const thinkingMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      thinking: [
        "• Анализирую ваш запрос...",
        "• Проверяю данные по продажам",
        "• Формирую рекомендации"
      ],
    };

    setMessages((prev) => [...prev, thinkingMessage]);

    // 2. Через 1.5с заменяем на финальный ответ
    setTimeout(() => {
      const responses = [
        "Основываясь на анализе ваших продаж, рекомендую:\n\n1. Увеличить рекламный бюджет на топ-3 товара на 20%\n2. Оптимизировать описания товаров с высоким CTR\n3. Запустить акцию на товары с низкой конверсией\n\nХотите подробности по каждому пункту?",
        "Я проанализировал данные за последнюю неделю:\n\n• Средний чек вырос на 8%\n• Конверсия снизилась на 3% - требуется оптимизация карточек\n• 5 товаров требуют пополнения запасов в течение 2 дней\n\nЧто хотите разобрать подробнее?",
        "По конкурентам в вашей нише:\n\n📊 Средняя цена на аналогичный товар: 2 890 ₽\n🎯 Ваша позиция: +12% выше рынка\n💡 Рекомендация: снизить цену на 7% или добавить бонус к покупке\n\nПоказать детальный анализ?",
        "Для оптимизации ваших товаров на Wildberries рекомендую:\n\n✓ Добавить 3-5 ключевых слов в описание\n✓ Обновить фото товаров (увеличит CTR на 15-20%)\n✓ Проверить остатки - у 12 товаров критически низкий запас\n\nС чего начнём?",
      ];

      const finalMessage: Message = {
        id: thinkingMessage.id, // ТОТ ЖЕ ID - заменяем!
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        thinking: undefined, // Убираем thinking
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === thinkingMessage.id ? finalMessage : msg))
      );
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
          >
            {/* Avatar */}
            <div
              className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                ? "bg-purple-600"
                : "bg-gradient-to-br from-purple-500 to-purple-600"
                }`}
            >
              {message.role === "user" ? (
                <User className="size-4 text-white" />
              ) : (
                <Bot className="size-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`flex-1 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"
                }`}
            >
              <Card
                className={`p-3 shadow-sm border-0 ${message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-900"
                  }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </Card>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Bot className="size-4 text-white" />
            </div>
            <Card className="p-3 bg-white border-0 shadow-sm">
              <div className="flex gap-1">
                <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-purple-600" />
            <p className="text-xs font-medium text-gray-700">Быстрые вопросы:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Задайте вопрос..."
            className="flex-1 border-gray-300 focus:border-purple-500"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
