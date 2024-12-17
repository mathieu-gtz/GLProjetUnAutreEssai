FROM openjdk:17-jdk-slim AS runtime

WORKDIR /app

COPY out/artifacts/ProjectManager_springboot_jar/ProjectManager_springboot.jar /app/ProjectManager_springboot.jar

EXPOSE 8080


ENTRYPOINT ["java", "-jar", "/app/ProjectManager_springboot.jar"]
