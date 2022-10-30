FROM maven:3-openjdk-11 AS builder

WORKDIR /app/src/

COPY src ./
COPY pom.xml ../

RUN mvn -f /app/pom.xml clean package

FROM openjdk:11

WORKDIR /lib/

COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar ./backend.jar

EXPOSE 3100

ENTRYPOINT [ "java","-jar","/lib/backend.jar"]
