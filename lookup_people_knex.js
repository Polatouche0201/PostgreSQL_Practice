var search = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });

var knex = require('knex')({
  client: 'pg',
  connection: { // put into .env
    // host : process.env.HOST_DB,
    // user : process.env.USER_DB,
    // password : process.env.PWD_DB,
    // database : process.env.NMAE_DB,
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  },
  debug: false,
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 10000
});

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   console.log('Searching...');
//   client.end();
// });

 knex.select('*').from('famous_people').where({first_name: search}).orWhere({last_name: search})
  .then(function(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${search}':`);
  for(let i in rows) {
    console.log(`- ${i}: ${rows[i].first_name} ${rows[i].last_name}, born '${rows[i].birthdate}'`);
  }

}).then(function () {
  return knex.destroy();
}).then(function () {
  console.log('Search Done.');
});
