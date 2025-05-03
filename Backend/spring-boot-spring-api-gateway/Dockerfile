FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-api-gateway-0.0.1-SNAPSHOT.jar","--server.port=8085"]
EXPOSE 8085