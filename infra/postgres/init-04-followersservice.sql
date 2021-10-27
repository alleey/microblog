
create database followersservice;
create user followersservice with password 'followersservice';
grant all privileges on database followersservice to followersservice;

\connect followersservice;
create schema if not exists followersservice authorization followersservice;

