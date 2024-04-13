FROM node:21 as build

COPY . /app

WORKDIR /app
RUN npm install 
RUN npm run build

FROM nginx:1.25.3-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
