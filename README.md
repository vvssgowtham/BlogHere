# BlogHere

BlogHere is a dynamic and feature-rich blogging platform built using modern web technologies. The project leverages a ReactJS frontend, NodeJS/ExpressJS backend, MongoDB database, and JWT for secure user authentication. It also employs React TanStack Query for efficient cache management to reduce API call times, with a user-friendly UI built using MUI (Material-UI) and Bootstrap.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## About the Project

BlogHere is a full-stack web application designed to make it easy for users to create, read, and delete blogs. It provides a seamless experience with modern UI components and powerful backend functionality. The main focus of this project is to offer a smooth and responsive platform that ensures minimal API call delays using React TanStack Query, optimizing the overall performance.

## Features

- **User Authentication**: Secure sign-up and login with JWT-based authentication.
- **Create and Manage Blogs**: Simple and intuitive interface for creating and managing blog posts.
- **Responsive Design**: Fully responsive UI using MUI and Bootstrap for a great experience on all devices.
- **Cache Management**: React TanStack Query is used to reduce unnecessary API calls and speed up data fetching.
- **Rich Text Editor**: Write blogs using a built-in rich text editor for easy formatting.

## Technologies Used

- **Frontend**: 
  - ReactJS
  - MUI (Material-UI)
  - Bootstrap
  - React TanStack Query

- **Backend**:
  - NodeJS
  - ExpressJS

- **Database**:
  - MongoDB

- **Authentication**:
  - JSON Web Tokens (JWT)

## Installation

To set up and run this project locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB server running locally or use a MongoDB Atlas connection string.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/vvssgowtham/BlogHere.git
   cd BlogHere

2. Navigate to the backend directory and install dependencies:
   cd server
   npm install

3. Create a `.env` file in the `backend` directory and add the following variables:
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key

4. Start the backend server:
   npm start

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory: cd client and then npm install

2. Start the frontend development server: npm start

3. The application should now be running at `http://localhost:3000`.

### Usage

- Visit `http://localhost:3000` in your browser.
- Sign up or log in with your credentials.
- Create, Read, or delete blog posts.

### Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

### Contact

For any questions or feedback, please reach out to:

-VVSS Gowtham - [gowthamvvss@gmail.com](mailto:gowthamvvss@gmail.com)
