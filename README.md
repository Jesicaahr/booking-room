# booking-room

## Tech Stack

**Server:** Node, Express

**Database:** PostgreSQL (ORM Sequelize)


## Documentation

[Documentation](https://documenter.getpostman.com/view/10895410/UzQvs4xM)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET`

`PORT`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Jesicaahr/booking-room.git
```

Go to the project directory

```bash
  cd booking-room
```

Install dependencies

```bash
  npm install
```

Edit config according to your database

Add .env file

```bash
  touch .env
```

Create database

```bash
  sequelize db:create
```

Migrate database

```bash
  sequelize db:migrate
```

Seeding database

```bash
  sequelize db:seed:all
```

Start the server

```bash
  npm run dev
```

admin email: admin@mail.com

admin pw: iniadmin

add new room using admin account
then regist new employee