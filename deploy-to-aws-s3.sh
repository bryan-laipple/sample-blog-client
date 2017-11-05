#!/usr/bin/env bash
#
# This script will build and deploy the project to AWS S3
#
# If your AWS CLI configuration has a named profile other than 'default' for AWS account
# then pass the profile name as the second argument.  If a profile is not passed as an argument
# the default profile is used.
#
# Usage:
#
# ./deploy-to-aws-s3.sh <bucket> <profile>
#
bucket=$1
profile=${2:-default}

# TODO potentially gzip ./dist/*.js and others, rename to remove .gz, and set --content-encoding as gzip in bucket

# build then sync the dist dir first with .js and .css resources, then assets, followed by anything else
npm install && \
npm run build:prod && \
aws --profile ${profile} s3 sync ./dist s3://${bucket} --exclude "*" --include "*.js" --include "*.css" && \
aws --profile ${profile} s3 sync ./dist s3://${bucket} --exclude "*" --include "assets/*" && \
aws --profile ${profile} s3 sync ./dist s3://${bucket}
