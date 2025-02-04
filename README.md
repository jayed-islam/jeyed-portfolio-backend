# Jayed's Portfolio Website Backend

This is the **backend server** for **Jayed's Portfolio Website**, a platform showcasing projects, skills, and professional achievements. The backend handles all core functionalities, including project management, contact form submissions, and serving portfolio data via APIs. Built with **Node.js**, **Express**, and **MongoDB**, it ensures a robust, scalable, and efficient server-side implementation.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

---

## Project Overview

The backend server provides APIs to power the portfolio website with features such as:

- Managing projects (CRUD operations).
- Displaying technology stack and skills.
- Handling contact form submissions.
- Serving portfolio data dynamically.

---

## Technologies Used

- **Node.js** - Server runtime
- **Express.js** - Web framework for building RESTful APIs
- **MongoDB** - NoSQL database for scalable data storage
- **Mongoose** - MongoDB ODM (Object Data Modeling)
- **TypeScript** - For type safety and better developer experience
- **JWT (JSON Web Tokens)** - Secure user authentication
- **Zod** - Schema validation for request payloads

---

## Features

### 1. Project Management

- Add, update, delete, and retrieve projects.
- Include project details like title, description, technologies, and live URLs.

### 2. Dynamic Skills Display

- API to manage and fetch skills.
- Categorize skills based on proficiency and type.

### 3. Contact Form Integration

- Capture visitor inquiries through a secure API.
- Store and manage contact submissions.

### 4. Portfolio Data

- Serve all portfolio content dynamically for a seamless frontend integration.

---

## Environment Variables

Create a `.env` file in the root directory and add the following configurations:

```env
# Server Configuration
PORT=5000


# JWT Secret
JWT_SECRET=your_jwt_secret

# Other environment variables
NODE_ENV=development
```

## Installation Guide

### Prerequisites

- Node.js (v16 or later)
- MongoDB (running locally or hosted)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/jayed-islam/phl2-final-assignment9-multivendor-ecom-bekreta-backend
   ```

2. Navigate to the project directory:

   ```bash
   cd phl2-final-assignment9-multivendor-ecom-bekreta-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables as described above.

5. Start the MongoDB server.

6. Run the server:
   ```bash
   npm run dev
   ```

## Running the Project

Start the development server with:

```bash
npm run dev
```

For production mode, use:

```bash
npm start
```

## Folder Structure

```
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── app.ts
├── tests
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

For any issues or suggestions, feel free to contact the development team. Happy coding!

# jeyed-portfolio-backend
