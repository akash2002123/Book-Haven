FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-book-user-0.0.1-SNAPSHOT.jar","--server.port=8099"]
EXPOSE 8099