docker stop api-green
docker stop postgreSQL
docker stop pgadmin4

docker compose down
docker compose -f docker-compose.yml -f docker-compose.override.yml --env-file .env up -d
npm run start:dev