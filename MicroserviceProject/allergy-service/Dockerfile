# Utiliser une image OpenJDK Runtime comme image parent
FROM openjdk:17-jdk-alpine
COPY target/allergy.jar .
# Exposer le port sur lequel l'application va écouter
EXPOSE 9070
# Commande pour exécuter l'application Spring Boot
ENTRYPOINT ["java", "-jar", "allergy.jar"]
