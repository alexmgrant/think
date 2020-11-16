#!/bin/bash

headerContentType="Content-Type:application/json"
baseUrl="https://think-api.herokuapp.com/identifier/" #http://localhost:3000/
currentPath="current"
nextPath="next"
currentEndpoint="$baseUrl$currentPath"
nexEndpoint="$baseUrl$nextPath"

accessToken=$(curl -X POST https://think-api.herokuapp.com/auth/local -d "email=value1&password=value2")
echo

echo "POST /auth/local"
echo $accessToken

echo "GET /current ${currentEndpoint}"
curl -H "Authorization:Bearer ${accessToken}" $currentEndpoint 
echo

echo "GET /next ${nexEndpoint}"
curl -H "Authorization:Bearer ${accessToken}" $nexEndpoint
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"integer": 1000}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo

echo "GET /next ${nexEndpoint}"
curl $nexEndpoint -H "Authorization:Bearer ${accessToken}"
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"integer": 10}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo

echo "GET /next ${nexEndpoint}"
curl $nexEndpoint -H "Authorization:Bearer ${accessToken}"
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"integer": -0}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo

echo "GET /current ${currentEndpoint}"
curl $currentEndpoint -H "Authorization:Bearer ${accessToken}"
echo

echo "PUT /current ${currentEndpoint}"
curl -d '{"integer": 0}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo

echo "GET /current ${currentEndpoint}"
curl $currentEndpoint -H "Authorization:Bearer ${accessToken}"
echo


echo "PUT /current Invalid payload ${currentEndpoint}"
curl -d '{"integer": "20"}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo
curl -d '{"integer": {}}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint
echo
curl -d '{"integer": -300}' -H $headerContentType -H "Authorization:Bearer ${accessToken}" -X PUT $currentEndpoint


