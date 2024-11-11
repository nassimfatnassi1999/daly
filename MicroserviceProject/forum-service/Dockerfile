# Utiliser une image OpenJDK Runtime comme image parent
FROM openjdk:17-jdk-alpine
COPY target/forum.jar .
# Exposer le port sur lequel l'application va écouter
EXPOSE 9030
# Commande pour exécuter l'application Spring Boot
ENTRYPOINT ["java", "-jar", "forum.jar"]
