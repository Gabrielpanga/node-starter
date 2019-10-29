docker-compose up -d 
docker exec -it node-graphql-app npm run db:create:all
docker exec -it node-graphql-app npm run start-dev
docker logs node-graphql-app --follow