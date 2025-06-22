-- Create the database
CREATE DATABASE ce_department_system;

-- Connect to the database
\c ce_department_system;

-- Create schema for better organization
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS finance;
CREATE SCHEMA IF NOT EXISTS users;
