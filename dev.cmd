docker stop postgreSQL-prod
docker stop pgadmin4-prod
docker stop api-green

cd docker
docker compose down
docker compose up -d
cd ..
npm run start:dev