#!/bin/sh

SERVER_URL=http://localhost:6969

status() {
    printf "\n=====================================================\n"
    printf "%s\n" "$1"
    printf -- "-----------------------------------------------------\n"
    printf "%s\n" "$2"
}

post_business() {
  curl -X POST -s \
  -H 'Content-Type: application/json' \
  -d '{"name":"Bobs Burgers", "city":"Bobtown", "state":"PN", "zip":"12700", "streetAddress":"420", "phoneNumber":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
  $SERVER_URL/businesses/
}

# POST a new business
output=$(post_business)
status 'POST a new business' "$output"

# fail to post a business
output=$(curl -X POST -s \
           -H 'Content-Type: application/json' \
           -d '{"city":"Bobtown", "state":"PN", "streetAddress":"420", "phoneNumber":"867-5309", "category":"burgerstand", "subcategory":"with_fries"}' \
           $SERVER_URL/businesses/)
status 'fail to POST a new business without name or zip' "${output}"

# GET a business
output=$(curl -s $SERVER_URL/businesses/0)
status 'GET a business' "${output}"

# PATCH a business
curl -X PATCH -s \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jimmy Pestos Insurrection Pizza"}' \
  $SERVER_URL/businesses/0 > /dev/null
output=$(curl -s $SERVER_URL/businesses/0)
status 'PATCH name on a business' "${output}"

# DELETE /businesses/
post_business >> /dev/null
curl -X DELETE -s \
  $SERVER_URL/businesses/1 > /dev/null
output=$(curl -s $SERVER_URL/businesses/1)
status 'DELETE a business' "${output}"

# GET /businesses/
for _ in $(seq 0 19)
do
  post_business >> /dev/null
done
output=$(curl -s $SERVER_URL/businesses/)
status 'GET every business' "${output}"

output=$(curl -s "$SERVER_URL/businesses?page=2")
status 'GET every business' "${output}"

# POST /review/
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '{"starRating":"5", "dollarSignRating":"4"}' \
    $SERVER_URL/reviews/)
status 'POST a new review' "${output}"

# GET /review/{id}
output=$(curl -s $SERVER_URL/reviews/0)
status 'GET a review' "${output}"

# PATCH /reviews/{id}
curl -X PATCH -s \
  -H 'Content-Type: application/json' \
  -d '{"reviewBody":"Great but 4 pricey to me"}' \
  $SERVER_URL/reviews/0 > /dev/null
output=$(curl -s $SERVER_URL/reviews/0)
status 'PATCH body on a review' "${output}"
# etc.

# POST /photos/
output=$(curl -X POST -s \
    -H 'Content-Type: application/json' \
    -d '' \
    $SERVER_URL/photos/)
status 'POST a new photo' "${output}"

# GET /photos/0
output=$(curl -s $SERVER_URL/photos/0)
status 'GET a photo' "${output}"

# PATCH /photos/id
curl -X PATCH -s \
  -H 'Content-Type: application/json' \
  -d '{"caption":"a hotdog on top of a cold dog"}' \
  $SERVER_URL/photos/0 > /dev/null
output=$(curl -s $SERVER_URL/photos/0)
status 'PATCH caption on a photo' "${output}"