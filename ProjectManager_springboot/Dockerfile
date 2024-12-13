FROM openjdk:17-jdk-slim

# Ajoutez votre fichier JAR
COPY target/your-app.jar /app/your-app.jar

# Simulez les arguments JVM utilisés dans l'IDE
CMD ["java", "-XX:TieredStopAtLevel=1", "-Dspring.output.ansi.enabled=always", "-Dcom.sun.management.jmxremote", "-Dspring.jmx.enabled=true", "-Dspring.liveBeansView.mbeanDomain", "-Dspring.application.admin.enabled=true", "-Dmanagement.endpoints.jmx.exposure.include=*", "-Dfile.encoding=UTF-8", "-Dsun.stdout.encoding=UTF-8", "-Dsun.stderr.encoding=UTF-8", "-jar", "/app/your-app.jar"]
