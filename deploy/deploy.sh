#!/usr/bin/env bash
# Builds the current checkout on the Hetzner host and restarts the container.
#
#   ./deploy/deploy.sh            # host alias from ~/.ssh/config
#   DEPLOY_HOST=root@1.2.3.4 ./deploy/deploy.sh
set -euo pipefail

HOST="${DEPLOY_HOST:-Hetzner-Server}"
DIR=/opt/dance-academy

cd "$(dirname "$0")/.."

rsync -az --delete \
  --exclude .git --exclude node_modules --exclude .next --exclude .vercel \
  --exclude '.env*' --exclude lib/generated --exclude scrollcraft \
  ./ "$HOST:$DIR/src/"

ssh "$HOST" bash -se <<REMOTE
  set -euo pipefail
  cd $DIR
  cp src/deploy/docker-compose.yml docker-compose.yml
  # The build reads the database for the ISR pages, so it gets the env file as a secret.
  DOCKER_BUILDKIT=1 docker build --secret id=env,src=$DIR/.env -t dance-academy:local src
  docker compose up -d app
  docker image prune -f --filter "until=168h" >/dev/null
  for i in \$(seq 1 20); do
    state=\$(docker inspect -f '{{.State.Health.Status}}' dance-academy-app)
    echo "health: \$state"
    [ "\$state" = healthy ] && exit 0
    sleep 5
  done
  docker logs --tail 60 dance-academy-app
  exit 1
REMOTE
