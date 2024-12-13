# Étape de build de l'application Angular
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers du projet Angular
COPY . .

# Compiler l'application Angular pour la production
RUN npm run build --prod

# Étape pour servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers build dans le répertoire de Nginx
COPY --from=build /app/dist/projectmanager_angular /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application Angular
EXPOSE 80

# Démarrer Nginx pour servir l'application Angular
CMD ["nginx", "-g", "daemon off;"]
