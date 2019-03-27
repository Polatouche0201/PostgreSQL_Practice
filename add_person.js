var firstName = process.argv[2];
var lastName = process.argv[3];
var birthDate = process.argv[4];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'test_db'
  },
  debug: false,
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 10000
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log('Inserting...');

  let insert1 = {id: "6", first_name: firstName, last_name: lastName, birthdate: birthDate};

  knex.insert(insert1).into("famous_people").then(function (id) {
    //console.log(id);
  })
  .finally(function() {
    knex.destroy();
  });

  console.log('Inserted');

  client.end();

});