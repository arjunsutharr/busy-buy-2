## BusyBuy React Project

**Key Features:**

- Secure user authentication with Firebase
- Scalable data storage with Firebase Cloud Firestore
- Organized project structure with Redux Toolkit for state management
- Efficient state management using Redux Toolkit and separate reducer files

**Table of Contents**

- [About BusyBuy](#about-busybuy)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)

## About BusyBuy

BusyBuy is a React application that simplifies the online shopping experience. It empowers users to view all the products, filter products, add products to cart, place orders with ease.Firebase provides secure user authentication and a scalable NoSQL database (Cloud Firestore) to manage your application data effectively.

**Built with:**

- React
- Firebase (for authentication and storing data)
- Redux Toolkit (for efficient state management)

## Getting Started

### Prerequisites

- Node.js (version 14 or later) and npm (or yarn) installed on your system. You can download them from [https://nodejs.org/en/download](https://nodejs.org/en/download)

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/arjunsutharr/busy-buy-2](https://github.com/arjunsutharr/busy-buy-2)
```

2. Navigate to the project directory:

```bash
cd busy-buy
```

3. Install dependencies:

```bash
npm install
```

### Configure Firebase

1. Inside firebaseConfig.js, replace placeholders with your actual Firebase project configuration obtained from the Firebase console. Include details like API key, authentication domain, project ID, and Cloud Firestore configuration options.

Example:

```bash
const firebaseConfig = {
  apiKey: "your-firebase-api-key",
  authDomain: "your-firebase-auth-domain.firebaseapp.com",
  projectId: "your-firebase-project-id",
  storageBucket: "your-firebase-bucket-id",
  messagingSenderId: "your-firebase-messagingSender-id",
  appId: "your-firebase-app-id",
};
```

## Project Structure

This project adheres to a well-organized structure for better maintainability:

- src: Houses the core React application code.
- components: Reusable React components for building UI elements.
- pages: Individual application pages with specific functionalities, including login, signup, product listings, cart, orders and 404Page.
- redux: Contains Redux-related files for managing application state:

  - authenticationReducer.js: User authentication state and functions (login, signup, logout).
  - ProductReducer.js: Manages product data, filtering, and manipulation.
  - CartReducer.js: Controls user cart items, quantities, and updates.
  - OrderReducer.js: Manages order details, history, and management.

- firebaseInit.js: Initializes the Firebase app using your project configuration.
- App.js: The main application entry point, responsible for initializing components, routing, and authentication.
- public: Contains static assets like images, fonts, and favicons used throughout the app.
- package.json: Manages project dependencies, scripts, and metadata.

## Running the Application

1. Start the development server:

```bash
npm start
```

This will launch the development server and open BusyBuy in your default browser, usually at http://localhost:3000 (the port might vary).
