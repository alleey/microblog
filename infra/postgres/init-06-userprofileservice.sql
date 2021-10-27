
create database userprofileservice;
create user userprofileservice with password 'userprofileservice';
grant all privileges on database userprofileservice to userprofileservice;

\connect userprofileservice;
create schema if not exists userprofileservice authorization userprofileservice;

