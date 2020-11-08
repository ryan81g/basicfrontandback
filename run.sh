#!/bin/bash

## only one input arg  for now but needs to be logging level flag '-d'
while getopts d: flag
do
  case "$flag" in
    d) loggingLevel=${OPTARG}
  esac
done

## run the app
java -jar target/basicfrontandback-0.0.1-SNAPSHOT --loggingLevel=$loggingLevel