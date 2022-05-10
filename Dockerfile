FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# estágio de produção
FROM nginx:stable-alpine as production-stage
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8083
CMD ["nginx", "-g", "daemon off;"]