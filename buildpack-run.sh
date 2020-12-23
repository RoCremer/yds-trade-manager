#!/bin/bash

node scripts/generate-static-json.js $(cat "$ENV_DIR/REACT_APP_SET_API_HOST")
