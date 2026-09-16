
## MSM API

The API is a small Sinatra service backed by PostgreSQL. It exposes
`GET /health`, `POST /api/signup`, and same-origin resource downloads at
`GET /api/resources/:slug`. Resource origins stay in the server's resource
registry; the download route returns the upstream file bytes and never
redirects the browser to the storage provider.

For file downloads, configure a Google service account and point
`GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_KEY_PATH` at the
JSON credentials. The server exchanges that credential for a Drive API access
token and streams the file bytes from `https://www.googleapis.com/drive/v3/...`.

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

### Deployment: why Vercel proxies `/api`

The API runs on Render; the client runs on Vercel. The client does **not** call
Render directly. `client/vercel.json` rewrites `/api/*` and `/health` to the
Render host so the browser only ever sees one origin:

```json
{ "source": "/api/(.*)", "destination": "https://msm-api.onrender.com/api/$1" }
```

This is deliberate. The session cookie is `SameSite=Lax`
(`configuration/security.rb`), and a `Lax` cookie is not sent on cross-site
`fetch` — only on top-level navigations. If the client called Render directly,
`POST /api/login` would return 200 and set the cookie, and then the very next
`GET /api/session` would arrive without it and answer
`{"authenticated": false}`. Users would appear to log in and be logged straight
back out, with nothing in any log to explain it. CORS is not the issue; it is
already configured correctly.

`VITE_API_URL` is therefore left unset in production, so
`import.meta.env.VITE_API_URL || ''` resolves to a relative path. This mirrors
local development, where the Vite dev server proxies the same two paths.

**If you remove those rewrites**, you must also change `same_site` to `:none` in
`configuration/security.rb` and set `CLIENT_ORIGIN` — and you inherit the
third-party-cookie restrictions in Safari and Brave that motivated the proxy.

The cleaner long-term fix is a shared parent domain (e.g. `api.example.org` and
`www.example.org`), which makes the requests same-site and lets the proxy go
away honestly.
