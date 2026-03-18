# Висновки лабораторних робіт (Lab 3-5)

## Lab 3: Платформа історичних подій з React та Routing
**Мета:** Створити інтерактивну платформу для вивчення історичних подій з використанням React та React Router.

**Виконано:**
- ✅ Налаштований проект Vite + React
- ✅ Реалізована маршрутизація між сторінками (React Router v7)
- ✅ Створено 6 компонентів: Navigation, Timeline, EventsPage, Test, ProgressChart, Modal
- ✅ Інтегровано 7 історичних подій з детальною інформацією
- ✅ Реалізована система тестування з 5 запитань
- ✅ Відображення прогресу користувача
- ✅ Відзивчивий дизайн з градієнтами (#667eea → #764ba2)

**Технологія:** React 19, React Router 7.13.1, Vite 8, CSS

**Статус:** ✅ Робочий локально

---

## Lab 4: Розширення Lab 3 з Firebase Authentication
**Мета:** Додати систему автентифікації користувачів за допомогою Firebase.

**Виконано:**
- ✅ Встановлений Firebase SDK v12.10.0
- ✅ Налаштована аутентифікація через email/пароль
- ✅ Реалізована реєстрація та логін користувачів
- ✅ Впроваджена функція `onAuthStateChanged()` для збереження сесії
- ✅ Додана кнопка вихіду (logout)
- ✅ Захист маршрутів: показування форми автентифікації до входу
- ✅ Виправлено проблему з білим екраном (переміщення `<BrowserRouter>` на top level)
- ✅ Отримання та відображення email користувача в Navigation

**Технологія:** Firebase Authentication, React Context State

**Статус:** ✅ Робочий локально

---

## Lab 5: Full-Stack: Express Backend + Firestore + API Endpoints
**Мета:** Розвинути Lab 4 з добавленням серверної частини для збереження та обробки результатів тестів.

**Виконано:**

### Backend (Render.com)
- ✅ Налаштований Express сервер v4.18.2
- ✅ Встановлений Firebase Admin SDK для доступу до Firestore
- ✅ Реалізовані REST API endpoints:
  - `POST /api/test-results` - збереження результатів тестів
  - `GET /api/test-results/:userId` - отримання та обчислення середньої оцінки
  - `GET /health` - перевірка стану сервера
- ✅ Налаштована CORS для фронтенду
- ✅ Впроваджена обробка Firebase сервісного акаунту через Base64

### Database (Firestore)
- ✅ Колекція `testResults` в Firestore
- ✅ Кожен документ містить: userId, email, score, maxScore, testName, timestamp
- ✅ Налаштовані правила безпеки (Firestore Rules)

### Frontend
- ✅ Оновлена сторінка Test: збереження результатів на сервер перед виведенням результату
- ✅ Оновлена сторінка ProgressChart: отримання даних з сервера та обчислення середньої оцінки
- ✅ API URL змінено з `localhost:3000` на `https://lab5-backend-ssz7.onrender.com`

### Deployment
- ✅ Backend розгорнутий на **Render.com**: https://lab5-backend-ssz7.onrender.com
- ✅ Frontend розгорнутий на **Vercel**: https://denius88-github-io.vercel.app
- ✅ Весь код з'ємлювається на **GitHub**: https://github.com/Denius88/Veb

**Технологія:** Node.js/Express, Firebase Admin SDK, Firestore, Render (hosting), Vercel (hosting)

**Статус:** ✅ Повністю функціональна та розгорнута

---

## Архітектура Lab 5

```
┌─────────────────────────────────────────────────────┐
│  Frontend (Vercel)                                  │
│  React + Vite + Firebase Auth                       │
│  https://denius88-github-io.vercel.app              │
└────────────────┬────────────────────────────────────┘
                 │ HTTP/HTTPS запити
         ┌───────┴────────┬──────────────┐
         ▼                ▼              ▼
    ┌────────────┐  ┌──────────────┐  ┌──────────────┐
    │  Firebase  │  │  Express API │  │  Firebase    │
    │    Auth    │  │   (Render)   │  │  Firestore   │
    │            │  │              │  │  (Database)  │
    │ Логіни,    │  │ POST /api... │  │              │
    │ Пароли,    │  │ GET /api...  │  │ Результати   │
    │ UID        │  │              │  │ тестів       │
    └────────────┘  └──────────────┘  └──────────────┘
```

---

## Результати та навички

**Набуті навички:**
- Робота з React Router та маршрутизацією
- Інтеграція Firebase Authentication у React
- Розробка REST API на Express.js
- Робота з NoSQL базою даних (Firestore)
- Розгортання на хмарних платформах (Render, Vercel)
- Git контроль версій та GitHub collaboration
- CORS налаштування та безпека API
- Обробка асинхронних операцій (async/await)

**Посилання:**
- GitHub: https://github.com/Denius88/Veb
- Lab5 Frontend: https://denius88-github-io.vercel.app
- Lab5 Backend: https://lab5-backend-ssz7.onrender.com

**Дата завершення:** 18 березня 2026 р.
