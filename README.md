# Maintenance Tracker

A web application for tracking and managing equipment maintenance tasks.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/maintenance-tracker.git
cd maintenance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Generate a new secret key:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Update your `.env` file with the generated secret:
     ```
     NEXTAUTH_SECRET=your-generated-secret
     NEXTAUTH_URL=http://localhost:3000
     ```

### Environment Variables

The following environment variables are required:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js session encryption | None (Required) |
| `NEXTAUTH_URL` | Full URL of your application | `http://localhost:3000` |

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Authentication

The application uses NextAuth.js for authentication. Currently, it supports:
- Employee ID-based authentication (no password required)
- Session management
- Protected routes
