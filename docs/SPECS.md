# Project Specifications

## Overview

A mini Twitter-like web app. The user can type a thought, submit it, and it appears as a list below — newest first. Thoughts are saved to a database and persist across sessions. No auth, no likes, no edits. Just thoughts and timestamps.

---

## Architecture

```
frontend (React + Vite)  <-->  backend (Spring Boot)  <-->  database (MySQL)
      :5173                          :8080                      :3306
```

---

## Backend

| Property     | Value                      |
|--------------|----------------------------|
| Language     | Java 21                    |
| Framework    | Spring Boot 3.3.5          |
| Build tool   | Maven 3.9.16 (via wrapper) |
| Default port | 8080                       |
| Package      | `com.example.backend`      |

### API Endpoints

| Method | Path             | Description                        | Response                              |
|--------|------------------|------------------------------------|---------------------------------------|
| GET    | `/api/thoughts`  | Returns all thoughts, newest first | `[{"id": 1, "content": "...", "createdAt": "..."}]` |
| POST   | `/api/thoughts`  | Saves a new thought                | `{"id": 2, "content": "...", "createdAt": "..."}` |

### CORS

The backend allows cross-origin requests from `http://localhost:5173` (the Vite dev server).

### Dependencies

- `spring-boot-starter-web` — REST controller support
- `spring-boot-starter-data-jpa` — JPA/Hibernate ORM
- `mysql-connector-j` — MySQL JDBC driver
- `spring-boot-starter-test` — testing (test scope)

---

## Database

| Property | Value         |
|----------|---------------|
| Engine   | MySQL (local) |
| Port     | 3306          |
| Name     | `prac-db_java-react-1` |

### Table: `thoughts`

| Column       | Type         | Constraints              |
|--------------|--------------|--------------------------|
| `id`         | BIGINT       | PRIMARY KEY, AUTO_INCREMENT |
| `content`    | VARCHAR(280) | NOT NULL                 |
| `created_at` | DATETIME     | NOT NULL, DEFAULT NOW()  |

---

## Frontend

| Property       | Value            |
|----------------|------------------|
| Language       | JavaScript (JSX) |
| Framework      | React 18.2.0     |
| Build tool     | Vite 4.4.5       |
| Default port   | 5173             |
| Entry point    | `src/main.jsx`   |
| Root component | `src/App.jsx`    |

### UI Behavior

- Single page — no routing
- Text input + submit button at the top
- List of thoughts below, newest first
- Each thought shows: content + formatted timestamp
- Input clears after submit

### npm Scripts

| Script    | Command      | Purpose                      |
|-----------|--------------|------------------------------|
| `dev`     | `vite`       | Start development server     |
| `build`   | `vite build` | Compile for production       |
| `preview` | `vite preview` | Preview the production build |
| `lint`    | `eslint .`   | Lint JS/JSX files            |

### Dependencies

| Package              | Version  | Type    |
|----------------------|----------|---------|
| react                | ^18.2.0  | runtime |
| react-dom            | ^18.2.0  | runtime |
| vite                 | ^4.4.5   | dev     |
| @vitejs/plugin-react | ^4.0.3   | dev     |
| eslint               | ^8.45.0  | dev     |

---

## Project Structure

```
claude-practice/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/backend/
│   │       │   ├── BackendApplication.java
│   │       │   ├── Thought.java              # JPA entity
│   │       │   ├── ThoughtRepository.java    # Spring Data repo
│   │       │   └── ThoughtController.java    # REST controller
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml
│   └── mvnw / mvnw.cmd
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx       # Input + thought list
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── docs/
    ├── HOW-TO-RUN.md
    ├── SPECS.md
    └── HELP.md
```

---

## Deployment Plan

| Component | Local (Dev)         | Cloud (Prod)                    |
|-----------|---------------------|---------------------------------|
| Frontend  | Vite dev server     | Vercel or Netlify               |
| Backend   | `mvnw spring-boot:run` | Railway or Render (JAR deploy) |
| Database  | Local MySQL (phpMyAdmin) | Railway managed MySQL      |

Use Spring profiles (`application-dev.properties` / `application-prod.properties`) to switch DB connection strings without editing files manually.
