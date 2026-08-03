# Project Setup

## Backend

### Requirements

The following technologies are required:

* Node.js
* MySQL
* MongoDB

### Setup

1. Navigate to the `backend` folder:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm i
```

3. Create a `.env` file based on the provided example and configure:

* MySQL database URL
* `JWT_SECRET`
* MongoDB connection URL, if required

> Make sure MySQL is running locally if the application is configured to use a local database.

4. Run the Prisma migrations:

```bash
npx prisma migrate dev
```

5. Generate the Prisma Client:

```bash
npx prisma generate
```

6. Run the seed to create the initial data:

```bash
npm run seed
```

7. Start the development server:

```bash
npm run dev
```

### Admin User

An admin user is required to create new users in the system.

---

## Frontend

### Setup

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm i
```

3. Create a `.env` file based on the provided example and configure the API URL:

```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```
