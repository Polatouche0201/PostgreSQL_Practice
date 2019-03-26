var search = process.argv[2];

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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  let searchingCommand = `SELECT * FROM famous_people WHERE first_name='${search}' OR last_name='${search}'`;
  client.query(searchingCommand, (err, res) => {
    console.log('Searching......');
    if (err) {
      console.log(err.stack);
    } else {
      console.log(`Found ${res.rows.length} person(s) by the name '${search}':`);
      for(let i in res.rows) {
        console.log(`- ${i}: ${res.rows[i].first_name} ${res.rows[i].last_name}, born '${res.rows[i].birthdate}'`);
      }
    }
    client.end();
  })
});