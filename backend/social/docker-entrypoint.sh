#!/bin/bash

set -e

echo "Running database migrations"
yarn migrate

echo "Seeding database"
yarn seed

echo "Running pact tests"
yarn test:pact

echo "Starting server"
yarn start