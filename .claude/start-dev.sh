#!/bin/bash
cd /Users/matissdornier/Downloads/akasha-ai
exec node_modules/.bin/next dev -p ${PORT:-3000}
