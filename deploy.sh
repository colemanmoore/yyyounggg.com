#!/bin/bash

gulp
aws s3 rm s3://yyyounggg.com --recursive
aws s3 sync dist s3://yyyounggg.com --acl public-read --cache-control "public, max-age=43200"
