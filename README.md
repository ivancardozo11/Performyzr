# Performyzr

<div style="max-width: 600px; margin: 0 auto;">
 <p align="center"> 
 <img src="logo.png" width="500" height="400" alt="Image">
</p>
</div>


</div>


Performyzr is a high-performance Node.js backend application written in TypeScript, offering a robust RESTful API for managing athlete data and performance metrics. Built with a strong emphasis on scalability and clean architecture, Performyzr utilizes cutting-edge technologies like Hono, Prisma, and PostgreSQL. It adheres to hexagonal architecture and SOLID principles, ensuring the codebase is maintainable and extensible.

With Inversify handling dependency injection and Jest providing a comprehensive testing framework, Performyzr guarantees a modular and reliable system. The use of Docker and Docker Compose allows for seamless deployment and consistent development environments. Whether you're tracking athlete performance or managing complex data sets, Performyzr delivers efficiency and scalability in one powerful package.

# Requirements to run it locally:

* [NodeJS](https://nodejs.org/en/download "NodeJS")
* [Typescript](https://www.npmjs.com/package/typescript)
* [Hono Framework](https://hono.dev/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)
* [Redis](https://redis.io/es/)
* [Prisma](https://www.prisma.io/)
* [Inversify (Powerful dependency injection library)](https://inversify.io/)


# Installation instructions:

To use this application, it is necessary to read the documentation that explains the flow for recreating the operations.

Using this application requires creating a database container with Docker and another container for Redis, the in-memory database used for high performance. After that, through Prisma, the ORM, you will need to deploy the tables inside Postgres to enable asynchronous requests.

Carefully read the documentation to understand how to use the API endpoints and how to create data metrics inside Performyzr.

## Check at the code documentation here to see the whole setup:

<p>
  <a href="https://docs.google.com/document/d/1bvbEA-ceqkjhFANNQjpmhsZm6d46Gnpzrnnp7oXEEFQ/" target="_blank">
   Link to code documentation
  </a>
</p>

## Step 1:

## Download the repo that contains the code base.+

```sh
git clone https://github.com/ivancardozo11/Performyzr.git
```



## Step 2:

## Go to `path/to/Performyzr/`  and  install all packages through npm running:

```sh
npm install
```

## Step 3:

## In case you want to see the logs run the development server:

```sh
npm run dev
```

OR

## Run production ready code that will build through tsc the latest version of the code that  is parsed from ts to js.

Note: the dist folder is the one that should be drop in a cloud host provider.

```sh
npm run start
```

## To test the solution:

## Run tests:

```sh
npm run test
```
Note: The documentation contains step to step guide to run the backend on detail.