FROM maven
WORKDIR /app
COPY . /app
RUN mvn clean package
CMD ["java", "-jar", "target/spring-boot-spring-ConfigServer-0.0.1-SNAPSHOT.jar","--server.port=1234"]
EXPOSE 1234