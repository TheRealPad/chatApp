#!/bin/bash
set -e

echo "Starting backend..."
make -C api

echo "Starting frontend..."
make -C client

echo "Both frontend and backend are up!"
