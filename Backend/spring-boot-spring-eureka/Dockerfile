FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-eureka-0.0.1-SNAPSHOT.jar","--server.port=8761"]
EXPOSE 8761