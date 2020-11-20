![REPO SIZE](https://img.shields.io/github/repo-size/jmicko/koala-holla-jens-master.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/jmicko/koala-holla-jens-master.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/jmicko/koala-holla-jens-master.svg?style=social)

## This must stop:

![Nevar again](https://i.makeagif.com/media/8-22-2014/GO_DT4.gif)

# Koala Holla

Our client, Koala Holla (1976 Llama Comma Drive, Walla Walla WA) is a non-profit dedicated to the ethical transitioning of koalas from the outdoors (whereupon they may be rained) to urban areas where roofs exist. Your team has been hired to build a web app to handle their terrarium residents.

## Description

Duration:4 hours

This is a website to hold Koalas in a database to track details about them and track current Koalas.

## Technologies

- JQuery
- Node
- Express
- SQL

## Assumptions

- You are using Postico
- You installed Postgres with homebrew
- Postgres is currently running on your computer

## Setup

*Fork
*Clone
*Follow Database Setup below
*Create a modules/pool.js file for your database connection
*You can find a sample file below
*run npm install
*run npm start
*Open browser to http://localhost:5000

### Database Setup

You'll need to create a database called `koalas`.

Use the provided `database.sql` file to create the `koala` table and setup some test data.

##Sample pool.js
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
database: 'koalas', // name of our database
host: 'localhost', // where is your database?
port: 5432, // this is the default port
max: 10, // number of connections
idleTimeoutMillis: 10000 // 10 seconds
});

// When we connect to the database, run a function
pool.on('connect', () => {
console.log(`Connected to database...`);
})

pool.on('error', (error) => {
console.log('Error from pg', error);
})

module.exports = pool;
