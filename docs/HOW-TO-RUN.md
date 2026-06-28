# How to Run

This project has three parts: a MySQL database (via XAMPP), a Spring Boot backend, and a React frontend.

---

## Prerequisites

- XAMPP (MySQL running)
- Java 21+
- Node.js (with npm)
- No global Maven install required — the backend includes the Maven wrapper (`mvnw`)

---

## Step 1 — Start MySQL via XAMPP

1. Open the **XAMPP Control Panel**
2. Click **Start** next to **MySQL**
3. Open **phpMyAdmin** → http://localhost/phpmyadmin
4. Create a new database named: `prac-db_java-react-1`

> Spring Boot will auto-create the `thoughts` table on first run. You just need the empty database to exist.

---

## Step 2 — Configure your MySQL password (if any)

Open `backend/src/main/resources/application.properties` and set your password:

```properties
spring.datasource.password=yourpassword
```

If your XAMPP MySQL root has no password (default), leave it blank.

---

## Step 3 — Start the Backend (Spring Boot)

From the `backend/` directory:

**Windows:**
```
mvnw.cmd spring-boot:run
```

**Mac/Linux:**
```
./mvnw spring-boot:run
```

The backend starts on **http://localhost:8080**.

To verify it's running, visit: http://localhost:8080/api/thoughts

Expected response: `[]` (empty array if no thoughts yet)

---

## Step 4 — Start the Frontend (React + Vite)

From the `frontend/` directory:

```
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**.

Open http://localhost:5173 in your browser — you should see the Thoughts input and an empty list.

---

## Running Order Summary

| Step | What to start | Where | URL |
|------|---------------|-------|-----|
| 1 | XAMPP MySQL | XAMPP Control Panel | http://localhost/phpmyadmin |
| 2 | Backend | `backend/` → `mvnw.cmd spring-boot:run` | http://localhost:8080 |
| 3 | Frontend | `frontend/` → `npm run dev` | http://localhost:5173 |

Open two terminal windows (one for backend, one for frontend). MySQL must be running before the backend starts.
