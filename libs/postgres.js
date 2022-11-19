const { Client } = require('pg')

async function getConection() {

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'cristian',
    password: 'Cristian123',
    database: 'my_store',
  })
  await client.connect()
  return client;
  // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  // console.log(res.rows[0].message) // Hello world!
  // await client.end()
}

module.exports = getConection;


