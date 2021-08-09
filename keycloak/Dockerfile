FROM jboss/keycloak:latest

COPY zabardast-realm.json /tmp/realm.json

ENV KEYCLOAK_USER admin
ENV KEYCLOAK_PASSWORD admin
ENV DB_VENDOR h2
ENV KEYCLOAK_IMPORT "/tmp/realm.json -Dkeycloak.profile.feature.upload_scripts=enabled"

EXPOSE 8080
EXPOSE 8443

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

CMD ["-b", "0.0.0.0"]
