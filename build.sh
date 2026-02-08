docker stop postgreSQL-dev
docker stop pgadmin4-dev

docker build -t api-green .
docker compose down
docker compose up -d