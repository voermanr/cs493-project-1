#!/bin/sh

SURL=http://localhost:6969

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
}

status 'POST a new business'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"name":"Bobs Burgers", "city":"Bobtown", "state":"PN", "zip":"12700", "street_address":"420", "phone_number":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
    $SURL/businesses/
echo ""

status 'fail to POST a new business without name or zip'
curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{"city":"Bobtown", "state":"PN", "street_address":"420", "phone_number":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
    $SURL/businesses/
echo ""

status 'GET a business'
curl $SURL/businesses/0
echo ""

status 'GET every business'
curl $SURL/businesses/
echo ""

status 'PATCH name on a business'
curl -X PATCH \
  -d '{"name":"Jimmy Pestos Insurrection Pizza}' \
  $SURL/businesses/0

# etc.