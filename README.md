# MERN Stack Project

A full-stack web application built using MongoDB, Express.js, React.js, and Node.js (MERN stack).

## Project Structure

```
project-root/
├── client/          # Frontend React application
└── server/          # Backend Express server
```

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Environment Variables Setup

### Client (.env)

Navigate to the client directory and create a `.env` file:

```bash
cd client
cp .env.sample .env
```

Update the `.env` file with your configuration:

```env
VITE_API_ENDPOINT=http://localhost:5000/api    # Backend API URL
```

### Server (.env)

Navigate to the server directory and create a `.env` file:

```bash
cd server
cp .env.sample .env
```

Update the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your_database_name
ACCESS_TOKEN_SECRET = 
ACCESS_TOKEN_EXPIRY = 1d
COOKIE_EXPIRE = 7
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

## Installation & Setup

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
# Regular start
npm start

# Development mode with nodemon
npm run dev
```

The server will start on http://localhost:5000 (or the port specified in your .env file)

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client application will start on http://localhost:5173 and will be accessible in your browser.

## Running the Complete Application

1. Start MongoDB service (if using local MongoDB):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
# or
mongod
```

2. Start the backend server (in server directory):
```bash
cd server
npm run dev
```

3. In a new terminal, start the frontend development server (in client directory):
```bash
cd client
npm run dev
```

## Building for Production

### Frontend Build

```bash
cd client
npm run build
```

The build files will be generated in the `dist` directory.

### Backend Build

```bash
cd server
npm run build
```

## Available Scripts

### Server

```bash
npm start         # Start the server
npm run dev       # Start the server with nodemon
npm test         # Run tests
```

### Client

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check if the MONGODB_URI in .env is correct
   - Verify network connectivity

2. **API Connection Issues**
   - Verify that both frontend and backend servers are running
   - Check if VITE_API_ENDPOINT in client .env matches the backend URL
   - Look for CORS errors in browser console

3. **Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

## Additional Information

- The frontend is built with Vite + React
- Backend API documentation can be found at http://localhost:5000/api-docs (when server is running)
- Make sure to replace placeholder values in .env files with your actual configuration
