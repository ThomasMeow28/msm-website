# Puma serves the app in production. `rackup` (WEBrick) still works for quick
# local runs, but WEBrick handles one request at a time — and signup holds the
# request open for a bcrypt hash plus an SMTP round trip, which would block
# every other visitor behind it.

port        ENV.fetch("PORT", 4567)
environment ENV.fetch("RACK_ENV", "development")

# Database#with_connection opens a fresh PostgreSQL connection per request, so
# max threads is also the peak connection count. Keep it below the database's
# connection limit.
threads 1, ENV.fetch("PUMA_MAX_THREADS", 5).to_i
