#!/bin/sh

SURL=http://localhost:6969

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
    printf "%s\n" "$2"
    printf "=====================================================\n"
}

# POST a new business
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '{"name":"Bobs Burgers", "city":"Bobtown", "state":"PN", "zip":"12700", "street_address":"420", "phone_number":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
    $SURL/businesses/)
status 'POST a new business' "$output"

# fail to post a business
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '{"city":"Bobtown", "state":"PN", "street_address":"420", "phone_number":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
    $SURL/businesses/)
status 'fail to POST a new business without name or zip' "${output}"

# GET a business
output=$(curl -s $SURL/businesses/0)
status 'GET a business' "${output}"

# PATCH a business
curl -X PATCH -s \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jimmy Pestos Insurrection Pizza"}' \
  $SURL/businesses/0 > /dev/null
output=$(curl -s $SURL/businesses/0)
status 'PATCH name on a business' "${output}"

# DELETE /businesses/
curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '{"name":"A Deletable Place", "city":"Bobtown", "state":"PN", "zip":"12700", "street_address":"420", "phone_number":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
    $SURL/businesses/ > /dev/null
curl -X DELETE -s\
  $SURL/businesses/1 > /dev/null
output=$(curl -s $SURL/businesses/1)
status 'DELETE a business' "${output}"

# GET /businesses/
output=$(curl -s $SURL/businesses/)
status 'GET every business' "${output}"

# POST /review/
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '{"starRating":"5", "dollarSignRating":"4"}' \
    $SURL/reviews/)
status 'POST a new review' "${output}"

# GET /review/{id}
output=$(curl -s $SURL/reviews/0)
status 'GET a review' "${output}"

# PATCH /reviews/{id}
curl -X PATCH -s \
  -H 'Content-Type: application/json' \
  -d '{"reviewBody":"Great but 4 pricey to me"}' \
  $SURL/reviews/0 > /dev/null
output=$(curl -s $SURL/reviews/0)
status 'PATCH body on a review' "${output}"
# etc.

# POST /photos/
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    $SURL/photos/)
status 'POST a new photo' "${output}"