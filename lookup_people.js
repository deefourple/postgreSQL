const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const second = process.argv[2];
const queryReq = `
    SELECT *
    FROM famous_people
    WHERE first_name LIKE $1::text
    OR last_name LIKE $1::text
  `;
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(queryReq, [second], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    console.log(`Found ${result.rows.length} person(s) by the name '${second}':`);
      for (let i = 0; i < result.rows.length; i++ ){
    console.log(`- ${result.rows.length}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate.getFullYear()}-${result.rows[i].birthdate.getMonth() + 1}-${result.rows[i].birthdate.getDate()}'`)
    }
    client.end();
  });
});

//getfullyear getmonth getDate