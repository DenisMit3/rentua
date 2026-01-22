# RentUA — Платформа аренды жилья и автомобилей

![RentUA](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop)

## 🚀 О проекте

**RentUA** — современная веб-платформа для посуточной аренды жилья и автомобилей в Украине. Комбинация Airbnb + Turo, адаптированная для локального рынка.

### ✨ Возможности

- 🏠 **Каталог жилья** — квартиры, дома, студии, комнаты
- 🚗 **Каталог автомобилей** — седаны, внедорожники, электромобили, премиум
- 🔍 **Умный поиск** — фильтры по городу, типу, цене
- 📱 **Адаптивный дизайн** — идеально на любом устройстве
- 💬 **Быстрое бронирование** — через Telegram или телефон

## 🛠 Технологии

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Стили**: Tailwind CSS
- **Анимации**: Framer Motion
- **Иконки**: Lucide React
- **Деплой**: Vercel

## 📁 Структура проекта

```
src/
├── app/
│   ├── page.tsx              # Главная страница
│   ├── listings/             # Каталог жилья
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── cars/                 # Каталог авто
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ListingCard.tsx
│   └── VehicleCard.tsx
└── data/
    ├── listings.ts           # Данные жилья
    └── vehicles.ts           # Данные авто
```

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен-сборки
npm start
```

## 🌐 Деплой на Vercel

1. Загрузите код на GitHub
2. Подключите репозиторий к [Vercel](https://vercel.com)
3. Vercel автоматически соберёт и задеплоит проект

## 📞 Контакты

- **Telegram**: [@rentua](https://t.me/rentua)
- **Телефон**: +380 99 123 45 67
- **Email**: info@rentua.com

## 📄 Лицензия

MIT © 2026 RentUA
