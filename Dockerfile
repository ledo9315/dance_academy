# syntax=docker/dockerfile:1.10

# Debian slim rather than Alpine: Prisma and sharp both want glibc.
FROM node:24-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Inlined into the browser bundle by `next build`, so it has to be known here.
ARG NEXT_PUBLIC_BASE_URL=https://angelasdanceacademy.com
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
# /album, /schedule and the sitemap are prerendered with ISR, so the build reads the
# database, and lib/env.ts validates every variable on import. The env file arrives as a
# build secret so none of it lands in a layer or the build cache.
RUN --mount=type=secret,id=env,required=true \
    set -a && . /run/secrets/env && set +a \
    && npx prisma generate && npx next build

FROM base AS runtime
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
