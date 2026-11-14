# Lib-Learn – Backend Documentation

The Lib-Learn backend is responsible for handling application logic, user authentication, database operations, seat management, membership plans, and booking operations.

It is built using Node.js, Express.js, and MongoDB, providing RESTful APIs for communication with the React frontend.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Nodemailer
- cookie-parser
- CORS

## Backend Responsibilities

### 1. Authentication and User Management

- User registration.
- User login and logout.
- Password hashing using bcrypt.
- JWT-based authentication.
- Email verification.
- Forgot-password functionality.
- Password reset.
- Authentication using HTTP-only cookies.
- Role-based access control for administrative operations.

### 2. Seat Management

- Create study-space seats.
- Retrieve seat information.
- Update seat details.
- Delete seats.
- Track seat availability.

### 3. Membership Plan Management

- Create membership plans.
- Retrieve available plans.
- Update plan information.
- Delete plans.
- Support different booking durations.

### 4. Booking Management

- Create seat bookings.
- Retrieve user bookings.
- Cancel bookings.
- Calculate booking end times.
- Validate seat availability.
- Prevent overlapping bookings.

### 5. Admin Dashboard

The administrative dashboard provides information about study-space operations, including:

- Total seats.
- Available and booked seats.
- Total membership plans.
- Active bookings.

## Booking Validation Logic

The backend checks whether a selected seat has an existing active booking that overlaps with the requested booking period.

Example:

```javascript
const conflict = await bookingModel.findOne({
  seat: seatId,
  status: "active",
  startTime: { $lt: endTime },
  endTime: { $gt: startTime }
});
```

If a conflicting booking exists, the requested reservation is rejected.

## Project Structure

```text
Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── models/
│
├── routes/
│
├── middleware/
│
├── services/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

*Adjust this structure to match your actual backend implementation.*

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB database

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Backend directory.

Add the environment variables required by your backend implementation.

Common configuration examples include:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Additional variables may be required for refresh tokens, email services, and frontend URLs. Use the exact variable names referenced in your backend source code.

**Important:** Never upload your actual `.env` file to GitHub.

### 3. Start the Server

Use the development command configured in your `package.json`.

For example, if your project defines a `dev` script:

```bash
npm run dev
```

The backend should connect to MongoDB before accepting application requests.

## API Modules

The backend is organized into the following functional API modules:

| Module | Responsibility |
|---|---|
| Authentication | Registration, login, logout, verification, password reset |
| Users | User-related operations |
| Seats | Seat creation, retrieval, updates, and deletion |
| Plans | Membership plan management |
| Bookings | Booking creation, retrieval, and cancellation |
| Dashboard | Administrative statistics |

Refer to the route files for the exact endpoint paths and HTTP methods.

## Security Implementation

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- HTTP-only cookies are used to store authentication tokens.
- Authentication middleware protects private routes.
- Role authorization restricts administrative operations.
- Environment variables protect sensitive configuration.
- Booking validation is performed on the backend.

## Database

MongoDB is used as the primary database, with Mongoose providing schema definition and database interaction.

The application uses database models to manage users, seats, membership plans, and bookings.

## Development Notes

- Keep sensitive configuration inside `.env`.
- Validate incoming API requests.
- Handle errors consistently.
- Check booking conflicts before creating reservations.
- Protect administrative routes.
- Keep database operations separate from request-handling logic where appropriate.

## Related Documentation

For frontend setup and complete project information, refer to:

- `../README.md` – Main project documentation.
- `../frontend/README.md` – Frontend documentation.