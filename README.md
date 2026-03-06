Production-style full-stack system built to digitize service center operations including work orders, invoicing, inventory management, customer management, and employee management.

# Service Center Management System

A full-stack business management platform designed for vehicle service centers to digitize daily operations such as work orders, invoicing, employee management, and service history tracking.

The system helps service centers reduce manual paperwork, streamline workflow management, and improve operational efficiency through a centralized digital platform.

## System Overview

This application provides an integrated platform that allows service center staff to manage customers, vehicles, service jobs, invoices, and operational data in one place.

Key goals of the system:

- Digitize service center workflows
- Reduce manual paperwork
- Improve operational transparency
- Provide centralized business data management

The platform is designed for employees and managers of vehicle service centers to track services, manage work orders, manage inventories, manage employees and generate invoices efficiently.

## Architecture

The project follows a full-stack web architecture with a separated frontend and backend.

Frontend: React / Vite
Backend: Node.js + Express
Database: MongoDB
Authentication: JWT + Role-Based Access Control (RBAC)
Deployment: Cloud server (AWS compatible)

### System Flow:

```text
┌───────────────────────┐
│   User (Admin/Staff)  │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   React Frontend      │
│   (Client Application)│
└───────────┬───────────┘
            │ REST API
            ▼
┌───────────────────────┐
│   Express Backend     │
│   (Node.js Server)    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│      MongoDB          │
│      Database         │
└───────────────────────┘
```

# Project Structure

```text
service-center-client
│
├── src
│   ├── axios
│   ├── common
│   ├── components
│   ├── constants
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── schemas
│   ├── sections
│   ├── store
│   ├── theme
│   └── utils
│
├── public
├── package.json
└── vite.config.js
```

**axios** - API services configs

**common** - Common services like notification tosts configs

**components** - Common reusable components

**constants** - Reusable strings

**hooks** - Custom React hooks for shared logic  

**layouts** - Main application layouts (header, sidebar, navbar, and footer)

**pages** - Main application views and route-based screens 

**routes** - Navigation logics and configurations

**schemas** - Yup validation schemas for form validations

**sections** - App UI controllers and views

**store** - Session storage configs

**theme** - Theme configurations

**utils** - Helper functions and utility modules

## Tech Stack

Frontend

- React.js
- Vite
- JavaScript
- Axios
- MUI

Backend

- Node.js
- Express.js
- REST API architecture
- JWT Authentication

Database

- MongoDB

Other Tools

- GitHub
- Postman (API testing)
- VS Code

### Features

***Work Order Management***

- Create and manage service work orders
- Track service progress
- Assign technicians to jobs

***Customer & Vehicle Management***

- Store customer profiles
- Maintain vehicle service history
- Track repeat service records

***Inventory Management***

- Manage inventory items
- Track stock levels
- GRN management

***Invoice Generation***

- Generate service invoices
- Track payments
- Maintain financial records

***Employee Management***

- Manage technicians and staff
- Track assigned tasks
- Track attendence

***Reporting & Insights***

- Generate operational reports
- View service history
- Track business activity

## API Examples

Example: Create Work Order

_POST /server/workorders/auth/_

Request Body

```text
{
  "customerId": "12345",
  "vehicleNumber": "ABC-1234",
  "serviceType": "Engine Repair",
  "millage": 12872
}
```

Response

```text
{
  "resonseCode": "RQST-0001",
  "responseMessage": "Work order created successfully",
  "responseData: null
}
```

## Setup Instructions

1 Clone the repository

```text
git clone https://github.com/Chanuka-Gishen/service-center-client.git
```

2 Install dependencies

```text
npm install
```

3 Configure environment variables

```text
Create .env file
```

Example:

VITE_API_URL=http://localhost:5000/api

4 Run development server

```text
npm run dev
```

5 Backend setup

Clone backend repository:

```text
git clone https://github.com/Chanuka-Gishen/service-center-backend.git
```

Install dependencies

```text
npm install
```

Run server

```text
npm start dev
```

## Business Impact

- This system helped service centers:
- Reduce manual paperwork by ~70%
- Improve operational transparency
- Digitize service records and invoices
- Track technician work and service history

## Future Improvements

- Mobile app for technicians
- Automated service reminders
- Payment gateway integration

# Author

**Chanuka Gishen Mendis**  
Backend-Focused Full-Stack Software Engineer

- **GitHub:**  
  https://github.com/Chanuka-Gishen

- **Portfolio:**  
  https://www.chanukagishen.com
 
