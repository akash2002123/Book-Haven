FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-book-order-0.0.1-SNAPSHOT.jar","--server.port=8084"]
EXPOSE 8084