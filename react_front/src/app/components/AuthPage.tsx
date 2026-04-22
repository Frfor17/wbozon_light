import { motion, AnimatePresence } from "motion/react";
import { Brain, Mail, Lock, User, ArrowRight, Chrome, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);


    // состояния БД
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.role === 'admin') {
                    window.location.href = 'http://localhost:8000/admin';
                
                } else navigate('/app');
            } else {
                setError(data.detail || 'Ошибка входа');
            }
        } catch {
            setError('Сервер недоступен');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerForm)
            });

            const data = await response.json();
            if (data.success) {
                setError('✅ Аккаунт создан! Теперь войдите.');
                setIsLogin(true);
            } else {
                setError(data.detail);
            }
        } catch {
            setError('Сервер недоступен');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="size-full overflow-auto bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-6">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
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
            </div>

            <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Branding */}
                <motion.div
                    className="hidden lg:block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl">
                            <Brain className="w-10 h-10 text-white" />
                        </div>
                        <span className="text-4xl font-bold text-white">SellerAI</span>
                    </div>

                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Начните продавать<br />эффективнее уже сегодня
                    </h1>

                    <p className="text-xl text-white/80 mb-8">
                        Присоединяйтесь к 15,000+ успешных продавцов на WB и Ozon
                    </p>

                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            >
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-white/90">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right side - Auth Form */}
                <motion.div
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">SellerAI</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isLogin
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                : "bg-white/5 text-white/60 hover:text-white"
                                }`}
                        >
                            Вход
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${!isLogin
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                : "bg-white/5 text-white/60 hover:text-white"
                                }`}
                        >
                            Регистрация
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-2">С возвращением!</h2>
                                <p className="text-white/60 mb-8">Войдите в свой аккаунт</p>

                                <form onSubmit={handleLogin} className="space-y-5">
                                    {/* Email login*/}
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={loginForm.email}
                                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {/* Пароль login*/}
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Пароль
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                value={loginForm.password}
                                                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                                required
                                                minLength={4}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded bg-white/10 border-white/20"
                                            />
                                            <span className="text-white/70 text-sm">Запомнить меня</span>
                                        </label>
                                        <button type="button" className="text-purple-400 text-sm hover:text-purple-300">
                                            Забыли пароль?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <span>⏳ Проверка...</span>
                                        ) : (
                                            <>
                                                <span>Войти</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="register"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-2">Создать аккаунт</h2>
                                <p className="text-white/60 mb-8">14 дней бесплатно, без карты</p>

                                <form onSubmit={handleRegister} className="space-y-5">
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Имя
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="text"
                                                placeholder="Иван Иванов"
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Пароль
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                            <input
                                                type="password"
                                                placeholder="Минимум 8 символов"
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded bg-white/10 border-white/20 mt-1"
                                        />
                                        <span className="text-white/70 text-sm">
                                            Я согласен с{" "}
                                            <a href="#" className="text-purple-400 hover:text-purple-300">
                                                условиями использования
                                            </a>{" "}
                                            и{" "}
                                            <a href="#" className="text-purple-400 hover:text-purple-300">
                                                политикой конфиденциальности
                                            </a>
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <span>Создать аккаунт</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-white/20" />
                        <span className="text-white/50 text-sm">или</span>
                        <div className="flex-1 h-px bg-white/20" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/5 border border-white/20 text-white py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <Chrome className="w-5 h-5" />
                            <span className="text-sm">Google</span>
                        </button>
                        <button className="bg-white/5 border border-white/20 text-white py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <Github className="w-5 h-5" />
                            <span className="text-sm">GitHub</span>
                        </button>
                    </div>

                    {/* Back to home */}
                    <button
                        onClick={() => navigate("/")}
                        className="w-full mt-6 text-white/60 hover:text-white text-sm transition-colors"
                    >
                        ← Вернуться на главную
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

const benefits = [
    "14 дней бесплатного доступа ко всем функциям",
    "Без привязки банковской карты",
    "Поддержка 24/7 на русском языке",
    "Отмена подписки в любое время"
];
