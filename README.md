### Create database

```
docker run -e POSTGRES_PASSWORD=mypass -d -p 5433:5432 \
-e PGDATA=/var/lib/postgresql/data/pgdata \
-v PGDISK/var/lib/postgresql/data \
-v /Users/victorchamale/Documents/projects/javascript/telus/budget/db:/docker-entrypoint-initdb.d \
postgres:14.6
```

### Create Backend

docker run -v /Users/victorchamale/Documents/projects/javascript/telus/budget/backend:/code \
-w /code \
-p 4001:4000 --rm -it \
node:19-buster "/bin/bash"

### DEV container

docker run \
-e VITE_BACKEND_URL = http://localhost:4000 \
-v $(pwd):/code \
-w /code \
-p 8080:3000 --rm -it \
node:16-buster "/bin/bash"
