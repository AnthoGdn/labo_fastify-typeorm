# labo_fastify-typeorm
Hi! Welcome to my labo.

In this project, I try Fastify.
It's a nodejs api programed with Typescript, Fastify and TypeORM.

## Technologies
* Nodejs
* Typescript
* Fastify
* TypeORM
* Postgress
* Jest
* Docker-compose

## Getting Started
### Requirements
* Nodejs (17.0.1)
* Yarn (1.22.17) or npm
* Docker (20.10.10)
* Docker-compose (2.1.1)

(Version numbers are just my versions)

### Run project on your computer
You just need to follow next commands to run the api on your computer.

#### Run a postgres server in a docker container
```sh
docker-compose up -d
```

#### Install nodejs dependencies
```sh
yarn
```

#### Run the api (watch mode)
```sh
yarn dev
```

#### Run tests (needs to up postgres server for integration tests)
```sh
yarn test
```

#### Run linter
```sh
yarn lint
```

## Todo
* Implement some features
* Add a fastify plugin to automatically import plugins and controllers
* Add a fastify plugin to add Swagger documentation 

## Author
Anthony Godin
- [gdn.anthony@gmail.com](mailto:gdn.anthony@gmail.com)
- [Linkedin](https://www.linkedin.com/in/anthony-godin-/)
