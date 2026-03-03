# QuickHire - Modern Job Board Platform

**Live Demo:** [https://quick-hire-front.vercel.app](https://quick-hire-front.vercel.app)

QuickHire is a comprehensive, full-stack job board application designed to bridge the gap between talented professionals and forward-thinking companies. It features a sleek, responsive frontend and a powerful, scalable backend API.

## Project Structure

The project is organized into two main repositories/folders:

- **[Frontend (quick-hire-front)](./quick-hire-front)**: A Next.js application providing the user interface for job seekers and administrators.
- **[Backend (quick-hire-server)](./quick-hire-server)**: A Node.js/Express API handling data persistence, authentication, and file storage.

## Key Features

- **Intuitive Job Discovery**: Search and filter through job listings with ease.
- **Seamless Applications**: Quick and reliable application submission process.
- **Robust Admin Dashboard**: Efficient management of job postings and candidate applications.
- **Secure Authentication**: JWT-based security for all administrative actions.
- **Cloud Media Management**: Integrated Cloudinary support for image uploads.

## Quick Start

### 1. Prerequisites

- Node.js (Latest LTS)
- MongoDB (Atlas or Local)
- Cloudinary Account

### 2. Setup Backend

```bash
cd quick-hire-server
npm install
# Configure your .env file (see quick-hire-server/README.md for details)
npm run dev
```

### 3. Setup Frontend

```bash
cd quick-hire-front
npm install
# Configure your .env file (see quick-hire-front/README.md for details)
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Contribution

For detailed information on each component, please refer to their respective README files:

- [Frontend Documentation](./quick-hire-front/README.md)
- [Backend Documentation](./quick-hire-server/README.md)
