# Lab5 - Безпека веб-сайтів та розгортання

Комплексна платформа для вивчення історії з аутентифікацією (Firebase), базою даних (Firestore) та серверною частиною (Express).

## Структура проекту

```
lab5/
├── src/                          # React фронтенд (Vite)
│   ├── App.jsx                   # Main app з аутентифікацією
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Timeline.jsx
│   │   ├── EventsPage.jsx
│   │   ├── Test.jsx
│   │   ├── ProgressChart.jsx
│   │   └── Modal.jsx
│   ├── data/
│   │   └── historicalData.js     # Historical events, tests, progress
│   ├── firebaseConfig.js         # Firebase configuration
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/                       # Static files
├── server/                       # Express.js сервер
│   ├── server.js                 # Main server + API routes
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── node_modules/
├── index.html
├── vite.config.js
├── package.json                  # Frontend dependencies
├── eslint.config.js
└── README.md
```

## Налаштування

### 1. Фронтенд (Vite + React)

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev
```

Доступний на `http://localhost:5173/`

### 2. Бекенд (Express + Firestore)

```bash
cd server

# Встановити залежності
npm install

# Скопіювати .env.example до .env та заповнити Firebase credentials
cp .env.example .env
```

**Отримати Firebase Service Account JSON:**
1. [Firebase Console](https://console.firebase.google.com)
2. Project Settings → Service Accounts → Generate new private key
3. Заповнити в `.env`

```bash
# Запустити сервер
npm start              # Production
npm run dev           # Development (з watch)
```

Доступний на `http://localhost:3000`

## API Endpoints

### GET `/api/test-results/:userId`
Отримати результати користувача та середню оцінку.

### POST `/api/test-results`
Зберегти результат тесту.

## Розгортання на Render

1. Push репозиторій на GitHub
2. На [render.com](https://render.com):
   - Root Directory: `lab5/server`
   - Build Command: `npm install`
   - Start Command: `npm start`

## Технологічний стек

**Фронтенд:** React 19, Vite 8, Firebase SDK 12  
**Бекенд:** Node.js + Express 4, Firebase Admin SDK 12, Firestore
