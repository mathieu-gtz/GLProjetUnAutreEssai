# Étape 1: Utilisation de l'image de base OpenJDK pour compiler le projet
FROM openjdk:17-jdk-slim AS build

# Installation de Maven
RUN apt-get update && apt-get install -y maven

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances Maven
COPY ./pom.xml .
RUN mvn dependency:go-offline

# Copier tout le code source dans l'image Docker
COPY . .

# Compiler l'application avec Maven (pas de tests)
RUN mvn clean package -DskipTests

# Étape 2: Utilisation d'une image Java plus légère pour l'exécution
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail pour l'exécution
WORKDIR /app

# Copier le fichier JAR généré depuis l'étape précédente
COPY --from=build /app/target/*.jar app.jar

# Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Commande pour exécuter l'application Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
