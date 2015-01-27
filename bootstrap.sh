#!/bin/bash

mkdir -p dist/fonts dist/js dist/css
cp -r _bower/bootstrap/less .
cp -r _bower/bootstrap/js .
cp _bower/jquery/dist/jquery.min.js dist/js
cp _bower/bootstrap/dist/fonts/* dist/fonts
