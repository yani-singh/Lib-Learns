# Lib-Learn – Frontend Documentation

The Lib-Learn frontend provides an interactive and responsive user interface for students and administrators.

It is developed using React.js and Tailwind CSS, allowing users to explore study spaces, select membership plans, book seats, and manage their reservations.

The frontend communicates with the backend through REST APIs using Axios.

## Technology Stack

- React.js
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React
- Vite

## Main Features

### 1. User Interface

- Clean and modern design.
- Responsive layouts.
- Consistent navigation.
- Reusable React components.
- Olive-green and white visual theme.

### 2. Authentication

- User registration.
- Login interface.
- Form validation.
- Password visibility toggle.
- Authentication API integration.
- User session handling through backend authentication.

### 3. Dashboard

The dashboard provides users with an overview of their study-space activity.

It can display:

- Welcome message.
- Available seats.
- Active bookings.
- Study statistics.
- Quick-action links.

### 4. Seat Booking

- Display available seats.
- Allow users to select seats.
- Display membership plans.
- Submit booking requests.
- Display booking results and notifications.

### 5. Notifications

React Hot Toast is used to display feedback messages for user interactions, including successful operations and errors.

## Project Structure

```text
frontend/
│
├── public/
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── api/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*Update the structure if your actual component and page folders differ.*

## Installation

### Prerequisites

- Node.js
- npm
- Backend application running

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Connection

Configure the Axios base URL to point to the running backend server.

For example:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true
});

export default API;
```

Update the URL if your backend uses a different port or API prefix.

### 4. Run the Development Server

```bash
npm run dev
```

Vite will start the frontend development server and display its local URL in the terminal.

### 5. Build for Production

```bash
npm run build
```

The production build is generated in the `dist` directory.

## Routing

React Router DOM is used to manage navigation between application pages.

The application can include routes for:

- Login.
- Registration.
- Dashboard.
- Seat selection.
- Membership plans.
- User bookings.
- Administrative pages.

Refer to `App.jsx` for the actual route configuration.

## API Communication

Axios is used to communicate with the backend.

The frontend sends requests for authentication, seat information, membership plans, booking operations, and dashboard information.

When cookie-based authentication is used, requests must include credentials where required.

## Design System

The frontend uses a minimal and productivity-focused design.

| Element | Design |
|---|---|
| Primary Color | Olive Green `#556B2F` |
| Background | White and soft beige |
| Typography | Clean and readable |
| Layout | Responsive |
| Components | Reusable React components |

## Development Guidelines

- Use reusable components.
- Keep page components organized.
- Maintain consistent styling.
- Handle API errors properly.
- Validate user input.
- Avoid hardcoding sensitive configuration.
- Keep frontend and backend API configurations synchronized.

## Related Documentation

- `../README.md` – Complete Lib-Learn project overview.
- `../Backend/README.md` – Backend architecture and setup instructions.