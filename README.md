# Student Management API

A secured REST API for managing student records, with user accounts, JWT authentication, input validation and rate limiting. The React client is in [frontend](https://github.com/charlesakwoyo/frontend).

## Features

- **User accounts:** register and log in; passwords hashed with bcrypt; JWT access tokens.
- **Students:** create, read, update and delete student records.
- **Validation** of every request body with Joi.
- **Rate limiting** (express-rate-limit) to slow down brute-force and abuse.
- Consistent error responses with http-errors.

## Tech stack

Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt · Joi · express-rate-limit

## Getting started

```bash
git clone https://github.com/charlesakwoyo/api.git
cd api
npm install
cp .env.example .env   # then fill in the values below
npm start
```

### Environment variables

| Variable | Purpose |
|---|---|
| `PORT` | Port (the React client expects 4000) |
| `MONGODB_URI` | MongoDB connection string |
| `DB_NAME` | Database name |
| `ACCESS_TOKEN_SECRET` | Secret used to sign JWTs |

## Author

**Charles Akwoyo** · [GitHub](https://github.com/charlesakwoyo) · [Portfolio](https://akwoyo.netlify.app)
