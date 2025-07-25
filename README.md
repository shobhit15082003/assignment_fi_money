# 📦 Inventory Management Tool (Backend API)

A simple backend inventory management system with JWT authentication, built using **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**. Fully Dockerized and documented using Swagger.

---

## 🚀 Features

- User registration and login with hashed password and JWT token
- Add, update, and fetch product inventory
- Token-based access to all product APIs
- Swagger documentation at `/api-docs`
- Dockerized with PostgreSQL service

---

## 📁 API Endpoints

| Method | Endpoint                    | Auth | Description                  |
|--------|-----------------------------|------|------------------------------|
| POST   | `/register`                 | ❌   | Register a new user         |
| POST   | `/login`                    | ❌   | Login and get JWT token     |
| POST   | `/products`                 | ✅   | Add new product             |
| PUT    | `/products/:id/quantity`    | ✅   | Update product quantity     |
| GET    | `/products`                 | ✅   | Get all products            |

---

## ⚙️ Environment Variables

Create a `.env` file (only needed for local dev):

```env
PORT=8080
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=inventory_db
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=supersecretkey
```

## 🐳 Docker Setup
Start app and database:

```bash
docker-compose up --build
```
App will be live at: http://localhost:8080

Swagger docs at: http://localhost:8080/api-docs


---

