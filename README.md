# labo_fastify-typeorm
Hi! Welcome to my labo.

This is a very small Nodejs api to manage Hockey team.

I programed this project to discover Fastify and TypeORM.

Note: I took my inspiration by a test created by Maplr: https://github.com/Maplr-Community/nodejs-test-hockey-game

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

## Architecture
### Tests
You can find some integration/e2e tests on [`__tests__integration/api`](https://github.com/AnthoGdn/labo_fastify-typeorm/tree/master/__tests__/integration/api).
To execute them, it's required to start a postgres database server. It's possible to start it with `docker-compose up -d`.
I like this kind of test because I can easly change my code architecture without changing my tests. They are integration tests and fonctionnal tests too.
Now my code base is established, I can easly play with the code architecture and change it with security of my functionnal tests... 

### Code architecture
I didn't take time to make a great architecture. A lot of business code should not be in controllers for example.

## List of possible improvements
* Create more DTO and mappers to map DTO to entities
* Move business code into service layer. No in controllers
* Add a fastify plugin to automatically import plugins and controllers
* Add a fastify plugin to add Swagger documentation

## Author
Anthony Godin
- [gdn.anthony@gmail.com](mailto:gdn.anthony@gmail.com)
- [Linkedin](https://www.linkedin.com/in/anthony-godin-/)
