
## Generate Keycloak keystores and certificates
```
keytool -genkeypair -alias keycloak -keyalg RSA -keysize 2048 -storetype JKS -keystore keycloak.jks -validity 3650 -dname "CN=localhost, OU=Dev, O=Zabardast, L=Keycloak, ST=Islamabad, C=PK" -ext SAN=dns:localhost,ip:127.0.0.1 -keypass zabardast -storepass zabardast

# Convert to p12 format
keytool -importkeystore -srckeystore keycloak.jks -destkeystore keycloak.p12 -srcstoretype JKS -deststoretype PKCS12 -srcstorepass zabardast -deststorepass zabardast
```

### Export key and certificate (Alternative method)
```
openssl pkcs12 -in keycloak.p12 -nokeys -out zabardast-keycloak.crt
openssl pkcs12 -in keycloak.p12 -nocerts -nodes -out zabardast-keycloak.key
chmod 644 zabardast-keycloak.*
```

## Import client/server certificates into services' trustStores
keytool -import -alias keycloak -file zabardast-keycloak.crt -keystore server.jks -keypass zabardast -storepass zabardast
