# Deskpro Helpdesk

A modern helpdesk solution with user/admin authentication, ticket management, and a responsive UI.

---

## Project Structure

```
Backend/
  index.js
  package.json
  .env
  ...
frontend/
  src/
  package.json
  .env
  ...
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (running locally or remote)

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```

2. **Configure environment variables:**
   - Edit `Backend/.env`:
     ```
     MONGO_URI=mongodb://localhost:27017/deskpro1
     JWT_SECRET=your_secret_key_here
     ```

3. **Start the backend server:**
   ```sh
   npm start
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000) by default.

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Configure environment variables:**
   - Edit `frontend/.env` if needed (default API proxy is set to `http://localhost:5000`).

3. **Start the frontend development server:**
   ```sh
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000) by default.

---

## Usage

- **User Registration/Login:**  
  Register as a user and log in to create and manage your own tickets.

- **Admin Login:**  
  Use the hardcoded admin credentials (see `Backend/routes/auth.js`) to log in as admin and manage all tickets/users.

- **Ticket Management:**  
  Users can create/view their tickets. Admins can view and update all tickets.

---

## Scripts

- **Frontend**
  - `npm start` — Start React dev server
  - `npm run build` — Build for production
  - `npm test` — Run tests

- **Backend**
  - `npm start` — Start backend server

---

## Notes

- The backend uses JWT for authentication.
- The frontend uses a proxy to forward API requests to the backend.
- Make sure MongoDB is running before starting the backend.

---

## License

MIT