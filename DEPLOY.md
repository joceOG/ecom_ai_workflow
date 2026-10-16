# KidiShop — Deploy Railway + PostgreSQL

## 1. Docker local
```bash
# Si "permission denied" sur docker.sock :
sudo usermod -aG docker $USER && newgrp docker
# ou temporaire : sudo chmod 666 /var/run/docker.sock

cp .env.example .env
docker compose up -d --build
docker compose logs -f app db
# App: http://localhost:3000 — DB health: /api/db-health
```

`docker-compose.yml` lance `postgres:16-alpine` + l'app Nuxt.
Au démarrage, `app` exécute `node scripts/db-migrate.mjs all`.

## 2. Railway
```bash
railway login
railway init        # ou: railway link
railway add --plugin postgresql   # ajoute DATABASE_URL automatiquement
railway up
# Variables requises : DATABASE_URL (auto), PG_SSL=true
# Healthcheck : /api/meta (voir railway.toml)
```

`railway.toml` utilise `builder = "DOCKERFILE"`.
Le startCommand rejoue la migration à chaque deploy :
`node scripts/db-migrate.mjs all || true; node .output/server/index.mjs`

## 3. Vérifier
- `GET /api/db-health` → `{ ok:true, db:"postgres", products:8 }`
- `GET /api/products?univers=fille` → `source:"postgres"`
- `POST /api/coupons/validate {"code":"KIDS10"}` → `source:"postgres"`
- `POST /api/orders` → persiste + décrémente `variants.stock`
- `GET /api/admin/orders` → liste commandes

Sans `DATABASE_URL`, les APIs retombent sur `mocks/catalog.ts` (`source:"mock"`).
