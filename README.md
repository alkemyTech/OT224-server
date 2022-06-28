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

## Start local server

``` bash
npm start
```
5) Admin and standard users:
``` bash
When executing the seeders, 10 admin users and 10 standard users will be created.

password for admin users: userAdmin2022
password for admin standar: userStandar2022
```