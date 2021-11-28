# FROM openjdk:15-alpine
# RUN  apk update && apk upgrade && apk add netcat-openbsd
# RUN mkdir -p /usr/local/@project.name@
# #COPY lib/ /usr/local/@project.name@/
# COPY @project.build.finalName@.jar /usr/local/@project.name@/
# ENTRYPOINT ["java","-jar","/usr/local/@project.name@/@project.build.finalName@.jar"]

FROM adoptopenjdk:15-jre-hotspot as builder
WORKDIR /build
COPY target/*.jar application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM adoptopenjdk:15-jre-hotspot
RUN groupadd -g 1000 zabardast && useradd -m -u 2001 -g zabardast service
USER service
WORKDIR /usr/local/service
COPY --from=builder --chown=service:zabardast /build/dependencies/ ./
COPY --from=builder --chown=service:zabardast /build/spring-boot-loader/ ./
COPY --from=builder --chown=service:zabardast /build/snapshot-dependencies/ ./
COPY --from=builder --chown=service:zabardast /build/application/ ./
VOLUME /usr/local/service/application/BOOT-INF/classes/config/
# RUN ls -l /usr/local/service
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
