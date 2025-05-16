

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



---

```markdown
# Lab7 API Testing - Validation & Authorization

This project is a RESTful API built with **Koa.js + TypeScript + PostgreSQL**, focusing on input validation, user authentication, and access control. It includes schema-based validation using `jsonschema`, Basic Authentication, and a protected route with role detection.

---

```

cw/
├── app.ts                  # Entry point
├── routes/
│   ├── public.ts           # Public GET routes
│   ├── private.ts          # Auth-protected CRUD routes
│   ├── users.ts            # User creation route with validation
│   └── special.ts          # Role-based route (/special)
├── controllers/
│   ├── auth.ts             # BasicAuth middleware
│   └── validation.ts       # JSON Schema validators
├── schemas/
│   ├── userSchema.ts       # User schema
│   └── articleSchema.ts    # Article schema
├── models/
│   ├── users.ts
│   └── articles.ts
├── types/                  # Type declarations
├── tsconfig.json
└── package.json

````

---

## 🚀 How to Start

```bash
npm install
npx ts-node app.ts
````

Server will run at:

> 📍 `http://localhost:3000`

Ensure your PostgreSQL is running and contains a `cw-api` database with `users` and `articles` tables.

---

## 🔐 Authentication

* Basic Authentication (`Authorization` tab in Postman)
* Username and password are verified against the database `users` table.
* Example credentials (pre-inserted into DB):

  * **Username:** `admin`
  * **Password:** `admin123`

---

## 🧪 API Routes Overview

### 🔓 Public Routes

| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| GET    | `/api/v1/public/articles`     | List all articles |
| GET    | `/api/v1/public/articles/:id` | Get article by ID |

---

### 🔒 Private Routes (Basic Auth)

| Method | Endpoint                       | Description    |
| ------ | ------------------------------ | -------------- |
| POST   | `/api/v1/private/articles`     | Create article |
| PUT    | `/api/v1/private/articles/:id` | Update article |
| DELETE | `/api/v1/private/articles/:id` | Delete article |

All routes validate the body with JSON Schema. Invalid structure returns 400 with error details.

---

### 👤 User Route (with validation)

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| POST   | `/users` | Create new user |

#### Example User Body

```json
{
  "firstname": "Tom",
  "lastname": "Lee",
  "username": "tomlee",
  "password": "abc123",
  "passwordsalt": "salt123",
  "email": "tom@example.com",
  "about": "Test user",
  "avatarurl": "https://example.com/avatar.jpg"
}
```

---

### ⭐ Special Route (Role Detection)

| Method | Endpoint   | Description                      |
| ------ | ---------- | -------------------------------- |
| GET    | `/special` | Returns role (`admin` or `user`) |

This route uses Basic Auth to identify the user and respond with their role.

#### Example Response

```json
{
  "message": "You are authenticated!",
  "user": {
    "id": 1,
    "username": "admin",
    ...
  },
  "role": "admin"
}
```

---

## ✅ JSON Schema Validation

Implemented using the `jsonschema` library.

* `controllers/validation.ts` exports a `validate(schema)` middleware
* Schemas are stored in `/schemas/`
* Applied to both `/users` and `/articles` POST and PUT routes

---

## 🧪 Postman Collection

> ✅ Collection name: `Lab7 API`

Includes all:

* Public GETs
* Protected POST/PUT/DELETE with Basic Auth
* `/special` role route
* Body validation errors

To export:
Click on the collection → `...` → `Export` → Choose JSON v2 → Save

---

## 🛠️ Tips

* Restart with `npx ts-node app.ts` if schema or route changes
* Use Postman’s Authorization tab for Basic Auth
* Use DBeaver to inspect inserted data or table structure

---

Created for Coursework Lab7
By: EchoCheung
Date: 2025/05/16

```



