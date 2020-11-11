#!/bin/bash

headerContentType="Content-Type:application/json"
baseUrl="http://localhost:3000/identifier/"
currentPath="current"
nextPath="next"
currentEndpoint="$baseUrl$currentPath"
nexEndpoint="$baseUrl$nextPath"

echo "GET /current ${currentEndpoint}"
curl $currentEndpoint 
echo

echo "GET /next ${nexEndpoint}"
curl $nexEndpoint
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"intiger": 1000}' -H $headerContentType -X PUT $currentEndpoint
echo

echo "GET /next ${nexEndpoint}"
curl $nexEndpoint
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"intiger": 10}' -H $headerContentType -X PUT $currentEndpoint
echo

echo "GET /next ${nexEndpoint}"
curl $nexEndpoint
echo

echo "GET /current ${currentEndpoint}"
curl $currentEndpoint 
echo

echo "PUT /current Invalid payload ${currentEndpoint}"
curl -d '{"intiger": "20"}' -H $headerContentType -X PUT $currentEndpoint
echo
curl -d '{"intiger": {}}' -H $headerContentType -X PUT $currentEndpoint
echo
curl -d '{"intiger": -300}' -H $headerContentType -X PUT $currentEndpoint

