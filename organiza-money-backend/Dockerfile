FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
ADD ./target/quality-0.0.1-SNAPSHOT.jar quality.jar
ENTRYPOINT ["java","-jar","/quality.jar"]