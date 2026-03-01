# QuickHire - Backend Logic & API

The QuickHire Backend is a production-ready RESTful API powered by Node.js, Express, and MongoDB. It handles the core business logic, including job management, application processing, and secure administrative authentication.

---

## Key Features

- **Scalable Architecture**: Built with TypeScript for type safety and maintainability.
- **Robust Security**: Protected by JWT authentication and security-focused middleware (Helmet, CORS).
- **Efficient Storage**: Direct integration with Cloudinary for handling media and resumes.
- **Data Integrity**: Comprehensive schema validation using Mongoose and `validator`.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Media**: Cloudinary
- **Auth**: JWT & BcryptJS

---

## Project Structure

```text
src/
├── config/       # Configuration files (Database, Cloudinary)
├── controllers/  # Request handlers and business logic
├── middleware/   # Custom middleware (Auth, Error handling, Uploads)
├── models/       # Mongoose schemas and models
├── routes/       # API route definitions
└── server.ts     # Entry point of the application
```

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description                     | Access |
| :----- | :---------------- | :------------------------------ | :----- |
| `POST` | `/api/auth/login` | Authenticate user and get token | Public |

### Jobs

| Method   | Endpoint        | Description                 | Access |
| :------- | :-------------- | :-------------------------- | :----- |
| `GET`    | `/api/jobs`     | Retrieve all job listings   | Public |
| `GET`    | `/api/jobs/:id` | Get details of a single job | Public |
| `POST`   | `/api/jobs`     | Create a new job posting    | Admin  |
| `DELETE` | `/api/jobs/:id` | Remove a job posting        | Admin  |

### Applications

| Method   | Endpoint                | Description                     | Access |
| :------- | :---------------------- | :------------------------------ | :----- |
| `GET`    | `/api/applications`     | List all submitted applications | Admin  |
| `POST`   | `/api/applications`     | Submit a new job application    | Public |
| `DELETE` | `/api/applications/:id` | Remove an application           | Admin  |

---

## Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB instance (Atlas recommended)
- Cloudinary credentials

### Local Setup

1. **Clone the repository** and navigate to `quick-hire-server`.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   NODE_ENV=development
   ```
4. **Run the server**:
   ```bash
   npm run dev
   ```

---

## Security

Administrative endpoints are protected by the `protect` and `admin` middleware. Ensure you include the `Authorization: Bearer <token>` header in your requests.

- `controllers/`: Request handling logic for each resource.
- `models/`: Mongoose schemas and models.
- `routes/`: API endpoint definitions.
- `middleware/`: Custom middleware (validation, error handling).
- `server.js`: Application entry point.
