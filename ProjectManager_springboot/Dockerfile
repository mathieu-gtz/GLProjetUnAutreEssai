# Utilisation de l'image de base OpenJDK pour Java
FROM openjdk:17-jdk-slim AS build

# Installation de Maven pour compiler le projet
RUN apt-get update && apt-get install -y maven

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . .

# Compiler l'application avec Maven
RUN mvn assembly:single

# Étape pour l'exécution
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR du répertoire de build de l'étape précédente
COPY --from=build target/classes/com/example/ProjectManager_springboot/ProjectManagerSpringbootApplication.class /app/app.jar

# Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Commande pour lancer l'application Spring Boot
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
