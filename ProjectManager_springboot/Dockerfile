# Étape de construction : Utilisation de l'image de base OpenJDK pour Java
FROM openjdk:17-jdk-slim AS build

# Installation de Maven pour compiler le projet
RUN apt-get update && apt-get install -y maven

# Définir le répertoire de travail dans le conteneur (cela peut être omis si vous êtes déjà dans le répertoire de votre projet)
WORKDIR /app

# Copier le fichier pom.xml pour qu'il soit disponible avant la copie du code source
COPY pom.xml .

# Télécharger les dépendances avec Maven pour ne pas les télécharger à chaque fois
RUN mvn dependency:go-offline

# Copier tout le code source dans le conteneur
COPY src ./src

# Compiler l'application avec Maven
RUN mvn clean package -DskipTests

# Étape d'exécution : Utilisation d'une image de base OpenJDK pour exécuter l'application
FROM openjdk:17-jdk-slim

# Copier le fichier JAR de l'étape de construction dans l'image d'exécution
COPY --from=build /app/target/*.jar app.jar

# Exposer le port 8080 pour l'application Spring Boot
EXPOSE 8080

# Commande pour lancer l'application Spring Boot
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
