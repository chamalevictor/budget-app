# Budget App 
Use this app to keep track of all your finances. Your expenses as well as your incomes. You can register your bank accounts and also whatever you have in cash so you don't miss a penny.

### Cloning the Repo...
Run a ``` git clone git@github.com:chamalevictor/budget-app.git ``` from whatever folder you want to work on.

### Installing dependencies
Once you have cloned it, you need to access to each part of the project and install dependencies.

Start by accessing to the frontend directory by running ``` cd frontend ``` from the parent directory and then installing the dependencies with ``` npm install ```

Next, access to the backend directory ``` cd ../backend ``` (if you're still in the frontend) and also run ``` npm install ```

Finally you will find the SQL script in the ``` db ``` folder. You can create the database manually or build a container that will automatically do it for you (see below).

#### Create Database Container.
Note: It is important that you have Docker installed in order to run this command.

Create Database Container:
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
