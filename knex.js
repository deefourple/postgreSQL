const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const input = process.argv[2];

knex.select().from('famous_people')
             .where("first_name", "like", input)
             .orWhere("last_name", "like", input)
             .then(function(result) {
             console.log('...Searching');
               if (result.length === 0) {
                 return console.error("error running query");
               }
                 console.log(`Found ${result.length} person(s) by the name '${input}':`);
                  for (let i = 0; i < result.length; i++ ){
                    console.log(`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.getFullYear()}-${result[i].birthdate.getMonth() + 1}-${result[i].birthdate.getDate()}'`);
                  }
                  process.exit();
});