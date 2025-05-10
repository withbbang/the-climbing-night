# Step 1: Build React App
FROM node:20.8.0 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf