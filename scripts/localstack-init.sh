#!/bin/bash

awslocal s3 mb s3://test
awslocal sqs create-queue --queue-name Test