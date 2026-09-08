
## MSM API

The API is a small Sinatra service backed by PostgreSQL. It currently exposes
`GET /health` and `POST /api/signup`.

### Local setup

1. Create a PostgreSQL database, for example:

	```bash
	createdb msm_development
	psql msm_development -f schema.sql
	```

2. Install Ruby dependencies:

	```bash
	bundle install
	```

3. Start the API:

	```bash
	bundle exec rackup -p 4567
	```

The server loads values from `.env` automatically when it boots. Copy
`.env.example` to `.env` and edit it for your local setup; no `source .env`
step is needed. Set `DATABASE_URL` there when PostgreSQL is not using the
default local connection.
The client Vite server proxies `/api` and `/health` to `http://localhost:4567`.
Set `SESSION_SECRET` to a long random value outside local development. Login
uses an HTTP-only session cookie and exposes `/api/session` and `/api/logout`.

Passwords are stored as bcrypt digests, and email uniqueness is enforced by a
case-insensitive PostgreSQL index.

Signup collects a name, email, password, and date of birth, then sends a
six-digit email verification code before the account can be used. Configure
`SMTP_ADDRESS`, `SMTP_FROM`, and optionally `SMTP_PORT`,
`SMTP_DOMAIN`, `SMTP_USERNAME`, `SMTP_PASSWORD`, and `SMTP_STARTTLS` in `.env`.
