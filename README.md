# Car Store - AST

## Introduction
Welcome to the **Car Store** project. This application provides a complete solution for managing cars, users, and purchases with a structured role-based access system.

## Features

### Article Management (Admin Only)
- Admin users can **list, create, search, edit, and delete** articles.
- Authentication required: User ID must be provided with each request.
- Search functionality by **Article ID** and **Brand**.

### User Management (Admin & Customers)
- Admins and customers can **list, create, and search** users.
- Admins can **delete users**, while customers can only create new accounts.

### Purchase Management (Customers Only)
- Customers can **list purchases and available cars**, as well as **search, buy, edit, and delete** purchases.
- Authentication required: User ID must be provided with each request.

## Installation & Setup
To get started with the project, follow these steps:

```bash
git clone https://github.com/marcosdizn/Car_store_3_fullStack_microservices.git
cd Car_store_3_fullStack_microservices
npm install  
npm start  
