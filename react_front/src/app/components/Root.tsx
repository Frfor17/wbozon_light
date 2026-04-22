import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Package, BarChart3, Settings, Shapes } from "lucide-react";
import { PageTransition } from "./PageTransition";

export default function Root() {
  const location = useLocation();
  
  const navItems = [
    { path: "/app", icon: Home, label: "Главная" },
    { path: "/app/chat", icon: MessageSquare, label: "Ассистент" },
    { path: "/app/products", icon: Package, label: "Товары" },
    { path: "/app/analytics", icon: BarChart3, label: "Аналитика" },
    { path: "/app/settings", icon: Settings, label: "Настройки" },
    { path: "/app/table", icon: Shapes, label: "Таблица" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-purple-600">AI Seller Assistant</h1>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">WB</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Ozon</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                  isActive
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="size-5 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
