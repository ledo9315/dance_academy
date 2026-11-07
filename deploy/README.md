# Hosting on the Hetzner server

The site runs as a Docker container on the shared Hetzner host (`Hetzner-Server` in
`~/.ssh/config`), next to daily-coding. Caddy on the host terminates TLS and proxies
`angelasdanceacademy.com` to `127.0.0.1:3001`.

| Where                                   | What                                                    |
| --------------------------------------- | ------------------------------------------------------- |
| `/opt/dance-academy/.env`               | Runtime and build variables (mode 600, never committed) |
| `/opt/dance-academy/docker-compose.yml` | Copied from `deploy/docker-compose.yml` on every deploy |
| `/opt/dance-academy/src`                | The source the image is built from                      |
| `/etc/caddy/Caddyfile`                  | Contains `deploy/Caddyfile.snippet`                     |

Database (Neon) and image storage (Vercel Blob) are external services and unchanged.

## Deploy

```bash
./deploy/deploy.sh
```

The script copies the working tree to the host, builds the image there, restarts the
container and waits for the health check. It deploys whatever is checked out locally,
so commit first.

## Change a variable

Edit `/opt/dance-academy/.env` on the host, then run the deploy script again.
`NEXT_PUBLIC_*` values are baked in at build time, so they need a rebuild either way.

## Logs

```bash
ssh Hetzner-Server docker logs --tail 100 -f dance-academy-app
```
