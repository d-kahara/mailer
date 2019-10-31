# Table of Contents
- [Technology Stack](#technology-stack)
- [Installation](#installation)
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
    ```
9. Run database migrations to create the tables using `sequelize db:migrate`
10. To start the application run `npm run dev`