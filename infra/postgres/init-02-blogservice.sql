
create database blogservice;
create user blogservice with password 'blogservice';
grant all privileges on database blogservice to blogservice;

\connect blogservice;
create schema if not exists blogservice authorization blogservice;

