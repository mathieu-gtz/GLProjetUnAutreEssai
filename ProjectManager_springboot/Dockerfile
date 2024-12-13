# Utilisation d'une image de base avec OpenJDK 17
FROM openjdk:17-jdk-slim AS runtime

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier JAR déjà compilé dans le conteneur
COPY /chemin/vers/le/fichier/ProjectManager_springboot.jar /app/ProjectManager_springboot.jar

# Exposer le port sur lequel l'application va écouter (par défaut 8080 pour Spring Boot)
EXPOSE 8080

# Commande pour lancer l'application Spring Boot avec Java
ENTRYPOINT ["java", "-jar", "/app/ProjectManager_springboot.jar"]
