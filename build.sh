#!/bin/bash

## clean the target first
mvn clean
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "Cleaned Successful"
else
echo "Clean Failed"
fi

mvn frontend:install-node-and-npm
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "Node installed Successful"
else
echo "Node install Failed"
fi

mvn frontend:npm
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "npm install Successful"
else
echo "npm install Failed"
fi

mvn frontend:webpack
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "Webpack of front end Successful"
else
echo "Webpack Failed"
fi

## ok lets compile and package

mvn package
STATUS=$?
if [ $STATUS -eq 0 ]; then
echo "Packaged Successful"
else
echo "Package Failed"
fi