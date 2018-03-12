#!/bin/bash
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER kodiaq WITH SUPERUSER PASSWORD 'kodiaq';
	CREATE DATABASE kodiaq_development OWNER kodiaq;
	CREATE DATABASE kodiaq_test OWNER kodiaq;
	CREATE DATABASE kodiaq_production OWNER kodiaq;
EOSQL
