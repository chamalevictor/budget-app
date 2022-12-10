# docker build -t backend:1.0.0 . 
# docker run -it -d -p 4000:4000 backend:1.0.0

FROM node:18.12-alpine3.15

ENV DB_USER_ID=postgres \
    DB_PASSWORD=mypass \ 
    DB_HOST=postgres \
    DB_PORT=5432 \
    DB_NAME=postgres \
    BACKEND_PORT=4000 \
    JWT_SECRET=secretWord \
    FRONTEND_URL=http://localhost:3000\
    EMAIL_USER=d4638804309754 \
    EMAIL_PASS=5ad12921351893 \
    EMAIL_HOST=smtp.mailtrap.io \
    EMAIL_PORT=2525 

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm uninstall bcrypt

RUN npm i bcrypt

CMD ["npm", "start"]
