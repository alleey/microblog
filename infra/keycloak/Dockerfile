FROM quay.io/keycloak/keycloak:latest

ENV KEYCLOAK_IMPORT "/tmp/realm.json -Dkeycloak.profile.feature.upload_scripts=enabled"
ENV SERVER_KEYSTORE_PASSWORD "zabardast"

COPY zabardast-realm.json /tmp/realm.json
COPY zabardast-keycloak.crt /etc/x509/https/tls.crt
COPY zabardast-keycloak.key /etc/x509/https/tls.key

# Needed if the keystore password is not 'password'
RUN sed -i -e 's/-out "${KEYSTORES_STORAGE}\/${PKCS12_KEYSTORE_FILE}" \\/-out "${KEYSTORES_STORAGE}\/${PKCS12_KEYSTORE_FILE}" \\\n      -passin pass:"${SERVER_KEYSTORE_PASSWORD}" \\/' /opt/jboss/tools/x509.sh
# Uncomment following to debug keystore creation issues
# RUN sed -i -e 's|>& /dev/null||g' /opt/jboss/tools/x509.sh

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]
EXPOSE 8080
EXPOSE 8443

CMD ["-b", "0.0.0.0"]
