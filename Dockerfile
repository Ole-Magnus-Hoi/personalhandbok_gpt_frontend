# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine as build
ENV PATH /app/node_modules/.bin:$PATH
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . /app
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
#Add env variable
ARG REACT_APP_PASSWORD
ENV REACT_APP_PASSWORD $REACT_APP_PASSWORD
# Build the app
RUN npm run build

#Stage 2 NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]