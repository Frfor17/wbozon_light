import { Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";

export default function Settings() {
  const settingsSections = [
    {
      title: "Платформы",
      items: [
        { icon: "🟣", label: "Wildberries", value: "Подключено", color: "text-purple-600" },
        { icon: "🔵", label: "Ozon", value: "Подключено", color: "text-blue-600" },
      ],
    },
  ];

  const notificationSettings = [
    { label: "Уведомления о заказах", enabled: true },
    { label: "Низкий остаток товаров", enabled: true },
    { label: "Изменения цен конкурентов", enabled: false },
    { label: "Новые отзывы", enabled: true },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Настройки</h1>
        <p className="text-sm text-gray-600">Управление аккаунтом и уведомлениями</p>
      </div>

      {/* Profile Card */}
      <Card className="p-4 border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex items-center gap-3">
          <div className="size-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl font-semibold">ИП</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">ИП Иванов А.С.</h3>
            <p className="text-sm text-purple-100">seller@example.com</p>
            <p className="text-xs text-purple-200 mt-1">ID: 123456789</p>
          </div>
        </div>
      </Card>

      {/* Connected Platforms */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Подключенные платформы</h2>
        <Card className="divide-y divide-gray-100 border-0 shadow-sm">
          {settingsSections[0].items.map((item, index) => (
            <button
              key={index}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className={`text-xs ${item.color}`}>{item.value}</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </button>
          ))}
        </Card>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          <Bell className="size-4 inline mr-2" />
          Уведомления
        </h2>
        <Card className="divide-y divide-gray-100 border-0 shadow-sm">
          {notificationSettings.map((setting, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-900">{setting.label}</span>
              <Switch defaultChecked={setting.enabled} />
            </div>
          ))}
        </Card>
      </div>

      {/* Other Settings */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Другое</h2>
        <Card className="divide-y divide-gray-100 border-0 shadow-sm">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-gray-600" />
              <span className="text-sm text-gray-900">Безопасность</span>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-gray-600" />
              <span className="text-sm text-gray-900">Язык и регион</span>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="size-5 text-gray-600" />
              <span className="text-sm text-gray-900">Помощь и поддержка</span>
            </div>
            <ChevronRight className="size-5 text-gray-400" />
          </button>
        </Card>
      </div>

      {/* Logout */}
      <button className="w-full p-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors shadow-sm">
        <LogOut className="size-5" />
        <span className="font-medium">Выйти из аккаунта</span>
      </button>
    </div>
  );
}
