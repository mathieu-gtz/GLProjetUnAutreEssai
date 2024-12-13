# Étape 1 : Utiliser l'image de base OpenJDK pour compiler et exécuter Java
FROM openjdk:17-jdk-slim AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers sources Java dans le conteneur
COPY src /app/src

# Étape 4 : Créer le répertoire pour les classes compilées
RUN mkdir -p /app/target/classes

# Étape 5 : Compiler les fichiers sources Java avec javac
RUN javac -d /app/target/classes /app/src/**/*.java

# Étape 6 : Créer le JAR avec la commande jar
RUN jar cf /app/target/app.jar -C /app/target/classes .

# Étape 7 : Étape pour l'exécution
FROM openjdk:17-jdk-slim

# Étape 8 : Définir le répertoire de travail
WORKDIR /app

# Étape 9 : Copier le fichier JAR compilé depuis l'étape de construction
COPY --from=build /app/target/app.jar /app/app.jar

# Étape 10 : Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Étape 11 : Lancer l'application avec Java
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
