import { Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight, Edit3, Settings2, Trash2, Plus } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { useState, useEffect } from 'react';

export default function Settings() {

  // ← СЮДА 1
  const [profile, setProfile] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', id: '' });

  const openEdit = () => {
    setEditForm(profile || { name: '', email: '', id: '' });
    setEditModal(true);
  };

  const saveEdit = async () => {
    await sendRequest('profile/edit', 'PUT', editForm);
    setProfile(editForm); // Обновляем локально
    setEditModal(false);
  };

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

  const sendRequest = async (endpoint, method = 'POST', body = null) => {
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };
      if (body) config.body = JSON.stringify(body);

      const response = await fetch(`http://localhost:8003/api/${endpoint}`, config);
      if (!response.ok) throw new Error('Ошибка сервера');
      return await response.json();
    } catch (error) {
      console.error('Запрос упал:', error);
      alert('Ошибка запроса');
    }
  };

  // ← СЮДА 2  
  useEffect(() => {
    sendRequest('profile', 'GET').then(setProfile);
  }, []);

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
            {profile ? (
              <>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm text-purple-100">{profile.email}</p>
                <p className="text-xs text-purple-200 mt-1">ID: {profile.id}</p>
              </>
            ) : (
              <div className="animate-pulse space-y-2">
                <div className="h-5 bg-white/30 rounded w-32"></div>
                <div className="h-4 bg-white/20 rounded w-48"></div>
                <div className="h-3 bg-white/20 rounded w-24"></div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => sendRequest('profile/new')}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Plus className="size-3.5 text-white" />
            </button>

            <button
              onClick={openEdit}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Edit3 className="size-3.5 text-white" />
            </button>

            <button
              onClick={() => sendRequest('profile/settings')}
              className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <Settings2 className="size-3.5 text-white" />
            </button>

            <button
              onClick={() => {
                if (confirm('Удалить профиль?')) {
                  sendRequest('profile/delete', 'DELETE');
                }
              }}
              className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all duration-200 backdrop-blur-sm border border-red-500/30"
            >
              <Trash2 className="size-3.5 text-red-200" />
            </button>
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
      {editModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Редактировать профиль</h3>

            <div className="space-y-3 mb-6">
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Название профиля"
              />
              <input
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Email"
              />
              <input
                value={editForm.id}
                onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="ID"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={saveEdit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all"
              >
                Сохранить
              </button>
              <button
                onClick={() => setEditModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
