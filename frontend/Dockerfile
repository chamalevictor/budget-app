# FRONTEND
# Build the image:
# docker build -t frontend:alpine-0.1.0 .
#
# Run container:
# docker run -d -p 3000:3000 frontend:alpine-0.1.0  

FROM node:19-alpine3.15

ENV VITE_BACKEND_URL=http://localhost:4000

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

# RUN npm run build

# FROM nginx:1.23.2-alpine

# COPY --from=build /opt/app/dist /usr/share/nginx/html

CMD ["npm", "run", "dev"]


