# 🚗 Car Store 

## Introduction  
Welcome to **Car Store**, a **comprehensive vehicle management system** designed to facilitate **car sales, user management, and purchase tracking**. This application features a **role-based access control system** to ensure secure and structured operations.  

---

## ✨ Key Features  

### 🛒 **Car & Inventory Management (Admin Only)**  
- **Admins** can **list, create, search, edit, and delete** cars from inventory.  
- Secure API endpoints requiring authentication with a **User ID**.  
- Search functionality available by **Car ID** and **Brand**.  

### 👥 **User Management (Admins & Customers)**  
- **Admins & customers** can **list, create, and search** for users.  
- **Admins** can **delete users**, while customers can only register new accounts.  

### 💳 **Purchase Management (Customers Only)**  
- **Customers** can **browse available cars, make purchases, review orders, edit, and cancel purchases**.  
- Authentication required: A **User ID** must be provided for every request.  

---

## ⚙️ Installation & Setup  

Clone the repository and install dependencies:  

```sh
git clone https://github.com/marcosdizn/Car_store_3_fullStack_microservices.git
```
```sh
cd Car_store_3_fullStack_microservices
```
```sh
npm install
```
```sh
npm start
```

## 🖥️ Development Server
Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

🖥️ Running the Development Server
1. Start the application
```sh
ng serve
```

2. Open your browser and visit: http://localhost:4200/

- The application will automatically reload when you make changes.

## 🤝 Contributing  
We welcome contributions to enhance functionality and optimize performance. To contribute:  
1. Fork this repository.  
2. Create a new branch for your feature.  
3. Submit a pull request with a detailed description of changes.  
