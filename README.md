

# Simple E-Commerce Shopping Cart

A simple e-commerce shopping cart application built with Laravel and React (Inertia.js). This project demonstrates clean Laravel architecture, authenticated user-based cart management, background jobs, and scheduled tasks while keeping the implementation intentionally simple and maintainable.

**Built for:** Practical Hiring Assessment
**Tech Stack:** Laravel 11, React (Inertia.js), Tailwind CSS, MySQL

---

##  Project Overview

This project implements a basic e-commerce shopping cart system where authenticated users can browse products and manage their personal shopping cart.

The main objective of the project is to demonstrate real-world Laravel skills, including authentication, database relationships, queue jobs, and task scheduling, following Laravel best practices.

Each shopping cart is **persisted in the database and associated with the authenticated user**, ensuring cart data is preserved across sessions without relying on browser storage or sessions.

---

##  Features

### User Features

* User authentication (register, login, logout) using Laravel Breeze (React + Inertia.js)
* Browse available products
* View product name, price, and stock quantity
* Add products to cart
* Update cart item quantities
* Remove items from cart
* Persistent cart tied to the authenticated user

### System Features

* Database-driven shopping cart (no session or local storage)
* Automatic stock tracking
* Background job for low-stock email notifications
* Scheduled daily sales report email

---

##  Tech Stack

### Backend

* **Framework:** Laravel 11
* **Authentication:** Laravel Breeze (Inertia.js + React)
* **Database:** MySQL
* **Queue:** Laravel Queue (database driver)
* **Scheduler:** Laravel Scheduler

### Frontend

* **Framework:** React
* **Routing & State:** Inertia.js
* **Styling:** Tailwind CSS

### Tooling

* Git & GitHub for version control
* Composer & npm for dependency management
* Vite for frontend asset bundling

---

##  Application Architecture

The application follows Laravel’s recommended MVC structure and keeps responsibilities clearly separated.

**High-level request flow:**

```
User Action
   ↓
React Component (Inertia.js)
   ↓
Laravel Controller
   ↓
Eloquent Models
   ↓
Database
   ↓
Jobs / Scheduler (if applicable)
```

Business logic is handled server-side to keep data consistent and secure.

---

## Database Models & Relationships

### User

* Has many cart items

### Product

* name
* price
* stock_quantity

### CartItem

* belongs to a user
* belongs to a product
* stores quantity per product per user

Each user can only have **one cart entry per product**, enforced at the database level.

---

##  Background Jobs & Scheduling

### Low Stock Notification

* A Laravel Job is dispatched when a product’s stock falls below a defined threshold
* The job sends an email notification to a dummy admin email address
* Queue driver used: `database`

### Daily Sales Report

* A scheduled command runs every evening
* Collects data for products sold during the day
* Sends a summary report to the dummy admin email
* Implemented using Laravel’s task scheduler

---

##  Setup & Installation

### Prerequisites

* PHP 8.2+
* Composer
* Node.js & npm
* MySQL

### Installation Steps

```bash
git clone https://github.com/YOUR_USERNAME/simple-ecommerce-cart.git
cd simple-ecommerce-cart
composer install
npm install
cp .env.example .env
php artisan key:generate
```

### Configure Database (`.env`)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_cart
DB_USERNAME=root
DB_PASSWORD=
```

### Configure Mail (Development)

```env
MAIL_MAILER=log
ADMIN_EMAIL=admin@example.com
```

### Run Migrations

```bash
php artisan migrate
```

### Build Assets & Run Server

```bash
npm run dev
php artisan serve
```

Visit: `http://127.0.0.1:8000`

---

## Running Queues & Scheduler Locally

### Queue Worker

```bash
php artisan queue:work
```

### Scheduler

```bash
php artisan schedule:work
```

For production, configure a cron job:

```bash
* * * * * php artisan schedule:run >> /dev/null 2>&1
```

---

---

##  Author

**Lucy Mwaura**
GitHub: [https://github.com/Scientistlucy](https://github.com/Scientistlucy)

---

##  License

This project is open-sourced software licensed under the MIT license.

---
