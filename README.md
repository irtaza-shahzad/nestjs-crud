# NestJS Multi-Entity CRUD API with JWT Authentication
---
A secure and modular REST API built with NestJS and TypeORM. This mini project provides a complete backend solution for managing multiple data entities (Users, Employees, Students) with a robust authentication system and DTO-based validation.
## Core Features
### JWT & Passport.js Authentication:
- Uses passport-local for credential validation and passport-jwt for session management.
- All data-related endpoints are protected by a JwtAuthGuard.
- Authenticated user data is available in the request object for auditing and permissions.
### Modular CRUD Architecture:
- Full CRUD (Create, Read, Update, Delete) operations for Users, Employees, and Students.
- Specialized endpoints for counts (/count), filtering (/high-achievers), and partial updates.
- Logically separated modules for high maintainability.
### Data Persistence with TypeORM:
- Leverages TypeORM for powerful and safe database interactions with MySQL.
- Implements soft-deletes on all entities, with dedicated endpoints for data recovery (/restore).
- Secure database and JWT configuration managed via a .env file.
### Automatic Validation:
- Uses class-validator DTOs to define strict rules for incoming request bodies.
- A global ValidationPipe automatically validates all payloads and rejects invalid requests.
---
## Technology Stack
- *Framework:* NestJS
- *Language:* TypeScript
- *Database:* MySQL
- *ORM:* TypeORM
- *Authentication:* Passport.js (passport-jwt, passport-local)
