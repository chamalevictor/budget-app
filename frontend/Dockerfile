# FRONTEND
# Build the image:
# docker build -t frontend:alpine-0.1.1 .
#
# Run container:
# docker run -d -p 3000:3000 frontend:alpine-0.1.1  

FROM node:16-alpine3.15

ENV VITE_BACKEND_URL=http://localhost:4000

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

CMD ["npm", "run", "preview"]


