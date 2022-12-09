# Budget App 
Use this app to keep track of all your finances. Your expenses as well as your incomes. You can register your bank accounts and also whatever you have in cash so you don't miss a penny.

## Cloning the Repo...
Run a ``` git clone git@github.com:chamalevictor/budget-app.git ``` from whatever folder you want to work on.

Once you have cloned it, you can access to the frontend directory by running ``` cd frontend ``` from the parent directory and then installing the dependencies with ``` npm install ```


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
