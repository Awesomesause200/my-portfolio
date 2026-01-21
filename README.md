# My Professional Portfolio

## Overview

This repository contains the source code for my professional portfolio website, showcasing my expertise in **Data Engineering** and modern cloud development practices.

The application is a **Single-Page Application (SPA)** built with **React** and is deployed as a static site on **AWS S3 + CloudFront**, demonstrating proficiency in cloud infrastructure, CI/CD, and front-end development.

### Key Technologies

- **Frontend:** React, JavaScript (via Vite)
- **Environment:** Docker / docker-compose (ensuring isolated, reproducible development)
- **Cloud Hosting:** AWS S3, AWS CloudFront (CDN)
- **Deployment:** Deployment occurs through AWS Amplify

## Getting Started (Local Development)

This project is fully containerized using Docker to ensure a consistent and isolated development environment.

## Build Steps

Build the docker container `docker compose up --build`
Deconstruct: `docker compose down`

You can also run `npm run dev` to run the code as compiled.

You can also run `npm run build` to build the finalized website to manually deploy the website if you wanted to do a manual upload.

- you should be running `npm run build` before pushing code to github (ensure the build works for AWS)
