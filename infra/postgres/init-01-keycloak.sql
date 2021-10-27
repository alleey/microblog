
create database keycloak;
create user keycloak with password 'keycloak';
grant all privileges on database keycloak to keycloak;

\connect keycloak;
create schema if not exists keycloak authorization keycloak;

