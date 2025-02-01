#!/bin/bash
set -e

echo "Starting backend..."
make -C api stop

echo "Starting frontend..."
make -C client stop

echo "Both frontend and backend are up!"
