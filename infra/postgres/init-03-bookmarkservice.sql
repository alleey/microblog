
create database bookmarkservice;
create user bookmarkservice with password 'bookmarkservice';
grant all privileges on database bookmarkservice to bookmarkservice;

\connect bookmarkservice;
create schema if not exists bookmarkservice authorization bookmarkservice;

