
create database resourceservice;
create user resourceservice with password 'resourceservice';
grant all privileges on database resourceservice to resourceservice;

\connect resourceservice;
create schema if not exists resourceservice authorization resourceservice;

