[![Build Status](https://travis-ci.org/d-kahara/mailer.svg?branch=master)](https://travis-ci.org/d-kahara/mailer)
[![Maintainability](https://api.codeclimate.com/v1/badges/33de38a2219fcc8f97d4/maintainability)](https://codeclimate.com/github/d-kahara/mailer/maintainability)
# Table of Contents
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [API-Endpoints](#api-endpoints)
- [Testing](#testing)



## Technology Stack
- NodeJS
- Express
- Mocha
- Postgres
- Sequelize
- Gmail API
- Nodemailer


## Installation

1. Install [`Node JS`](https://nodejs.org/en/).
2. To clone, run `git clone https://github.com/d-kahara/mailer.git`.
3. `cd` into the root of the **project directory**.
4. Run `npm install` on the terminal to install dependecies.
5. Create a `.env` file in the root directory of the application. Example of the content of a `.env` file is shown in the `.env.example`
6. Create and configure a google app and obtain the `client id` and `client secret` [`here`](https://console.cloud.google.com)
7. Configure OAuth for the client app and obtain a `refresh token ` from the  [` OAuth playground`](https://developers.google.com/oauthplayground/)
8. Setup local database.
   Download and configure [`postgres`](https://www.postgresql.org)
  - In your terminal, execute the following commands:
    ```
    sudo su - postgres
    psql
    CREATE DATABASE db_name encoding 'utf-8';
    CREATE DATABASE db_name_test encoding 'utf-8';
    ```
9. Run database migrations to create the tables using `sequelize db:migrate`
10. To start the application run `npm run dev`

## API-Endpoints

#### User Endpoints : /api/v1/

Method | Endpoint | Functionality
--- | --- | ---
POST | /users | Create a new user record
GET | /users | Get a List of all users
GET | /users/sendEmail | Send bulk emails to users in the database
GET | /users/upload | Upload google sheet data to database

## Testing


**Unit tests** - Run `npm run test` on the terminal while within the **project root directory**. Unit testing is achieved through the use of `mocha` package. 