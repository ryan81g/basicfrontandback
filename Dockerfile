# download maven image from Docker Hub
FROM maven:3.6.3-jdk-11-slim AS MAVEN_BUILD


# copy and packing source code in docker image

COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn com.github.eirslett:frontend-maven-plugin:install-node-and-npm
RUN mvn frontend:npm
RUN mvn frontend:webpack
RUN mvn package

# download openjdk image smallest java 11 I could find
FROM openjdk:11-jre-slim


# run war file in docker container
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/basicfrontandback-0.0.1.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]