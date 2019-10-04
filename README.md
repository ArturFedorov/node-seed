unified-be


yarn build
docker build --build-arg NODE_ENV_VAR=${ENVIRONMENT} -t $IMAGE_NAME:$TAG_NAME
docker build --build-arg NODE_ENV_VAR=production  -t seed .
docker run -p 80:80 $IMAGE_NAME



docker network create name_of_network
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123 -d --network=seed-network  postgres
image name in dbconfig host

docker build --build-arg NODE_ENV_VAR=production  -t seed .
docker run -p 80:80 --network=seed-network  seed
