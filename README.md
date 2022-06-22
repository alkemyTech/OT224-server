# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```
``` bash
Al ejecutar el comando anterior se van a crear 3 usuarios
* id: 1  email: userRegular@test.com  password: 1234  releId: 2
* id: 2  email: admin@test.com        password: 1234  releId: 1
* id: 3  email: userStandar@test.com  password: 1234  releId: 1
```


## Start local server

``` bash
npm start
```
