const pg = require('pg');

const client = new pg.Client(YOURCONFIGS);

client.connect((err) => {
  if (err) {
    throw err;

  client.query('SELECT $1::text', ['Somename'],(err, result) => {
    if (err) {
      throw err;

      console.log(result.rows[0]); //outputs array w/ 'Somename'

      client.end((err) => {
        if (err) {
          throw err;
       });
       }
    });
  })
  };
}