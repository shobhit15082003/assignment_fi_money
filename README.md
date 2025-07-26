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

## 🧪 How to Use in Postman

1. Open **Postman**
2. Click **Import** → Select the provided `postman_collection.json` file
3. Use the `Register` and `Login` endpoints to create a user and log in
4. After logging in, you'll receive an `access_token` in the response:
   ```json
   {
     "access_token": "your-jwt-token"
   }
  
5. Copy the access_token

6. In Postman, go to the Collections tab → Variables, and paste the token into the token variable:

```bash
token = <your-jwt-token>
```
7. Now you can test the protected routes like:
```bash
  POST /products

  PUT /products/:id/quantity

  GET /products
```

## .env
```bash
# Server Port
PORT=8080

# Database Configuration
DB_USER=postgres        # Your PostgreSQL username
DB_PASSWORD=your_password_here   # Your PostgreSQL password
DB_NAME=inventory_db    # Database name (change if needed)
DB_HOST=db              # Use 'db' when running inside Docker (matches docker-compose service name)
DB_PORT=5432            # Default PostgreSQL port

# JWT Secret Key
JWT_SECRET=Shobhit_key  # Secret key for token signing

```
  
---

