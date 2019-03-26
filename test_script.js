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

  // client.query("SELECT $1::int AS number", ["1"], (err, result) => {
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   console.log(result.rows[0].number); //output: 1
  //   client.end();
  //   console.log("Connect 1 End.");
  // });

  client.query('SELECT $1::text as message', ['Hello world!'], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].message);
    client.end();
    console.log("Connect 1 End.");
  });

});

