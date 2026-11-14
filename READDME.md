# Lib-Learn – Smart Study Space Booking Platform

Lib-Learn is a full-stack web application designed to simplify the process of booking seats in paid study spaces and libraries. It provides students with a convenient platform to explore available seats, choose membership plans, and manage their study-space reservations.

The platform also provides administrative functionality to manage seats, membership plans, and bookings through a centralized system.

## Key Features

### User Features
- User registration and login.
- Email verification.
- Secure authentication using JWT and HTTP-only cookies.
- Password reset functionality.
- Browse available study seats.
- Explore different membership plans.
- Book seats for selected durations.
- View personal bookings.
- Cancel existing bookings.

### Booking Management
- Seat availability checking.
- Automatic booking duration calculation.
- Booking conflict detection.
- Prevention of overlapping reservations for the same seat.
- Booking status management.

### Admin Features
- Manage study-space seats.
- Create and manage membership plans.
- Monitor bookings.
- View dashboard statistics.
- Manage study-space operations.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Routing | React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Email Service | Nodemailer |
| Development Tools | Git, GitHub, VS Code |

## Project Structure

```text
Lib-Learn-app/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── README.md
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── ...
│   ├── README.md
│   └── package.json
│
└── README.md
```

*The directory structure above describes the intended organization; adjust it to match the actual folders in your repository.*

## Application Workflow

1. A visitor opens the Lib-Learn platform.
2. The user registers or logs into an account.
3. The user explores available seats and membership plans.
4. The user selects a seat and booking duration.
5. The backend checks seat availability and existing bookings.
6. If the seat is available, the booking is created.
7. The user can view or cancel their bookings.

## Booking Conflict Prevention

Lib-Learn uses booking start and end times to check whether a seat is already reserved.

A new booking is allowed only when it does not overlap with an existing active booking for the selected seat.

This helps prevent multiple users from reserving the same seat for overlapping periods.

## Design Approach

The application follows a clean, modern, and responsive interface.

- Primary color: Olive Green (`#556B2F`)
- Supporting colors: White, cream, and soft beige.
- Minimal interface focused on productivity and ease of use.
- Responsive layouts for different screen sizes.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yani-singh/Lib-Learns.git
cd Lib-Learns
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Configure the backend environment variables using the instructions in `Backend/README.md`.

Start the backend using the development script defined in its `package.json`.

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will display the local frontend URL in the terminal.

## Security

- Password hashing using bcrypt.
- JWT-based authentication.
- HTTP-only cookies for authentication tokens.
- Environment variables for sensitive configuration.
- Backend-side booking availability validation.

Never commit `.env` files, database credentials, or API secrets to GitHub.

## Future Improvements

- Online payment integration.
- Booking history and advanced filters.
- Email notifications for booking confirmations.
- Enhanced admin analytics.
- Improved study-hour tracking.
- Deployment and production optimization.

## Author

**Yashraj Singh**

Full-Stack Developer | MCA Student

## License

This project is developed for educational and portfolio purposes. Add a license file if you intend to distribute it under a specific open-source license.