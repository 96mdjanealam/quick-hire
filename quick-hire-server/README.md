# QuickHire Backend Server

Simple Node.js (Express) backend for the QuickHire job portal, using MongoDB for data persistence.

## Features

- **Jobs API**: List, detail, create, and delete job listings.
- **Applications API**: Submit job applications.
- **Validation**: Input validation using `validator.js`.
- **Error Handling**: Global error handler for consistent API responses.
- **Security**: Basic security headers with `helmet` and `cors`.

## Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`.
   - Update `MONGO_URI` with your MongoDB connection string.
   - Update Cloudinary keys if needed (for company logo).

3. Start the server:
   - Development mode (with nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## API Endpoints

### Jobs

- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get single job details
- `POST /api/jobs` - Create a job (Admin)
  - Body: `{ title, company, location, category, description, company_logo? }`
- `DELETE /api/jobs/:id` - Delete a job (Admin)

### Applications

- `POST /api/applications` - Submit job application
  - Body: `{ job_id, name, email, resume_link, cover_note }`

## Folder Structure

- `config/`: Database connection and environment configuration.
- `controllers/`: Request handling logic for each resource.
- `models/`: Mongoose schemas and models.
- `routes/`: API endpoint definitions.
- `middleware/`: Custom middleware (validation, error handling).
- `server.js`: Application entry point.
