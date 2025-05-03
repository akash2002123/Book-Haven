FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-book-management-0.0.1-SNAPSHOT.jar","--server.port=8082"]
EXPOSE 8082