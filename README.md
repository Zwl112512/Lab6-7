

```markdown
# Lab6 API Testing - Articles & Users

This project is a RESTful API built with **Koa.js + TypeScript + PostgreSQL**. It allows CRUD operations for two resources: `articles` and `users`.

---

## 📦 Project Structure

```
cw/
├── app.ts                  # Entry point
├── routes/
│   ├── articles.ts         # Article routes (GET, POST, PUT, DELETE)
│   └── users.ts            # User routes (GET, POST, PUT, DELETE)
├── models/
│   ├── articles.ts         # Article model functions
│   └── users.ts            # User model functions
├── helpers/
│   └── database.ts         # Sequelize-based query helpers
├── .gitignore
├── tsconfig.json
└── package.json
```

---

## 🚀 How to Start

```bash
npm install
npx ts-node app.ts
```

Server will run at:  
> 📍 `http://localhost:3000`

Make sure your PostgreSQL is running, and you have a database called `cw-api`.

---

## 🔌 API Routes

### 📘 Articles

| Method | Endpoint              | Description           |
|--------|------------------------|-----------------------|
| GET    | `/articles`            | Get all articles      |
| GET    | `/articles/:id`        | Get article by ID     |
| POST   | `/articles`            | Create new article    |
| PUT    | `/articles/:id`        | Update article by ID  |
| DELETE | `/articles/:id`        | Delete article by ID  |

#### Example POST Body (Article)
```json
{
  "title": "Test Title",
  "alltext": "Full content",
  "summary": "Short summary",
  "published": true,
  "authorId": 1
}
```

---

### 👤 Users

| Method | Endpoint              | Description          |
|--------|------------------------|----------------------|
| GET    | `/users`               | Get all users        |
| GET    | `/users/:id`           | Get user by ID       |
| POST   | `/users`               | Create new user      |
| PUT    | `/users/:id`           | Update user by ID    |
| DELETE | `/users/:id`           | Delete user by ID    |

#### Example POST Body (User)
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "password": "123456",
  "email": "john@example.com"
}
```

---

## 🧪 Postman Testing

All routes have been organized into a Postman Collection named:

> `Lab6 API Testing - Articles & Users`

You can export this collection by clicking `...` → `Export`, and share or submit it if required.

---

## ✅ Tips

- Use `npx ts-node app.ts` to run without building.
- Use `pgAdmin` or `DBeaver` to visually confirm your data.
- If `Not Found` or `Internal Server Error` occurs, check your table name, database connection, or request format.

---

Created for Coursework Lab6  
By: EchoCheung  
Date: 2025/04/18  
```

