import { motion } from "motion/react";
import { Sparkles, TrendingUp, Zap, BarChart3, Brain, Rocket, ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="size-full overflow-auto bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [-100, 100, -100],
                        y: [-50, 50, -50],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    className="px-6 py-6 flex items-center justify-between max-w-7xl mx-auto"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">SellerAI</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-white/80 hover:text-white transition-colors">Возможности</a>
                        <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Тарифы</a>
                        <a href="#contact" className="text-white/80 hover:text-white transition-colors">Контакты</a>
                    </nav>
                    <button
                        onClick={() => navigate("/auth")}
                        className="bg-white text-purple-900 px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-white/20 transition-all"
                    >
                        Войти
                    </button>
                </motion.header>

                {/* Hero Section */}
                <section className="px-6 py-20 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
                                    <Sparkles className="w-4 h-4 text-yellow-300" />
                                    <span className="text-sm text-white">Мощный AI для вашего бизнеса</span>
                                </div>
                            </motion.div>

                            <motion.h1
                                className="text-6xl font-bold text-white mb-6 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                Увеличьте продажи на{" "}
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    WB и Ozon
                                </span>{" "}
                                с AI-ассистентом
                            </motion.h1>

                            <motion.p
                                className="text-xl text-white/80 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Автоматизируйте аналитику, оптимизируйте цены и управляйте товарами
                                с помощью искусственного интеллекта. Экономьте до 10 часов в неделю.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
                                >
                                    <span className="font-semibold">Попробовать бесплатно</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                    Смотреть демо
                                </button>
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-8 mt-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div>
                                    <div className="text-3xl font-bold text-white">15,000+</div>
                                    <div className="text-white/60">Активных продавцов</div>
                                </div>
                                <div className="w-px h-12 bg-white/20" />
                                <div>
                                    <div className="text-3xl font-bold text-white">₽2.5М+</div>
                                    <div className="text-white/60">Средний рост выручки</div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50" />
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3NjgzNTczOHww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Analytics Dashboard"
                                    className="relative rounded-3xl shadow-2xl w-full"
                                />

                                {/* Floating cards */}
                                <motion.div
                                    className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
                                    <div className="text-sm text-white/80">Продажи</div>
                                    <div className="text-2xl font-bold text-white">+127%</div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                                    <div className="text-sm text-white/80">Экономия времени</div>
                                    <div className="text-2xl font-bold text-white">12 ч/нед</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20 max-w-7xl mx-auto" id="features">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-bold text-white mb-4">
                            Всё, что нужно для роста продаж
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Мощные инструменты на основе AI для управления вашим магазином
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/70 mb-4">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 max-w-5xl mx-auto">
                    <motion.div
                        className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

                        <div className="relative text-center">
                            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Готовы увеличить продажи в 2 раза?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Присоединяйтесь к 15,000+ успешных продавцов. Первые 14 дней бесплатно,
                                без привязки карты.
                            </p>
                            <button
                                onClick={() => navigate("/auth")}
                                className="bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
                            >
                                <span>Начать прямо сейчас</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-white/70 text-sm mt-4">
                                ✓ Кредитная карта не требуется ✓ Отмена в любое время
                            </p>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}

const features = [
    {
        icon: Brain,
        title: "AI-аналитика",
        description: "Умная аналитика продаж и конкурентов в реальном времени",
        items: [
            "Прогноз спроса и остатков",
            "Анализ конкурентов 24/7",
            "Рекомендации по ассортименту"
        ]
    },
    {
        icon: TrendingUp,
        title: "Автоценообразование",
        description: "Динамическое управление ценами для максимальной прибыли",
        items: [
            "Автоматическая корректировка цен",
            "Учёт позиции в выдаче",
            "Защита от демпинга"
        ]
    },
    {
        icon: BarChart3,
        title: "Умная аналитика SKU",
        description: "Глубокий анализ эффективности каждого товара",
        items: [
            "ABC/XYZ анализ товаров",
            "Выявление неэффективных SKU",
            "Рекомендации по закупкам"
        ]
    },
    {
        icon: Zap,
        title: "Автоматизация рутины",
        description: "Освободите время для стратегических задач",
        items: [
            "Массовое обновление карточек",
            "Автоответы на отзывы",
            "Генерация описаний AI"
        ]
    },
    {
        icon: Sparkles,
        title: "SEO-оптимизация",
        description: "Выход в топ поисковой выдачи маркетплейсов",
        items: [
            "Подбор эффективных ключей",
            "Оптимизация названий/описаний",
            "Анализ семантики конкурентов"
        ]
    },
    {
        icon: Rocket,
        title: "Рост продаж",
        description: "Стратегии и инструменты для масштабирования",
        items: [
            "Персональный план роста",
            "A/B тестирование карточек",
            "Рекомендации по рекламе"
        ]
    }
];
