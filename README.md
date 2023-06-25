# Next Game Backend

This repo contains the web service for the next game website built with Node.js, 
Express.js, and MongoDB.

# Requirements
- node v17-19
- npm v6-9
- MongoDB

# Installation

To install all dependencies for this project run the following:
```
npm install
```

# Setup/Configuration

## Environments
Setup an `.env` file in the root of the repo. Can reference the `env.example` 
file for reference on what is expected inside the file.

**Additional resources**:
- [How to get a Steam API key](https://cran.r-project.org/web/packages/CSGo/vignettes/auth.html)

# Usage
To start the service locally run the following command in your terminal:
```
npm run dev
```

# Getting Started

## Testing
All unit tests are written using [Jest](https://jestjs.io/) 
and [Supertest](https://github.com/ladjs/supertest) and can be located in the 
`tests` directory. Make sure you have setup your `.env` file before beginning.

Run the following command in your terminal to begin testing while developing:
```
npm test -- --watch
```


# Deployments
WIP

