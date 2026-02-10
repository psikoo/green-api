docker stop api-green
docker stop postgreSQL
docker stop pgadmin4

docker build -t api-green .
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d