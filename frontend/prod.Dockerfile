FROM node:lts-alpine AS builder
ENV NODE_ENV production
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install --production
 
COPY . .
 
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder usr/src/app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
