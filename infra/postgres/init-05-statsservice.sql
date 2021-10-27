
create database statsservice;
create user statsservice with password 'statsservice';
grant all privileges on database statsservice to statsservice;

\connect statsservice;
create schema if not exists statsservice authorization statsservice;

