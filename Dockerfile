# syntax=docker/dockerfile:1

# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only what is needed for dependency resolution first (layer caching)
COPY ReplyGenerator/ReplyGenerator/pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build the JAR
COPY ReplyGenerator/ReplyGenerator/src src
RUN mvn clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/ReplyGenerator-0.0.1-SNAPSHOT.jar app.jar

# Render injects the PORT env var; Spring Boot reads it via server.port=${PORT:8080}
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]