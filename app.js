

// import faunadb, { query as q } from "faunadb"
import faunadb from 'faunadb';
const { query: q } = faunadb;

(async () => {
// const faunadb = require('faunadb')
// const q = faunadb.query

process.env.FAUNADB_SECRET = 'fnAEWuLalqACT7qbuWL5siGI-1WKT-7NvhWYTgYq'

const secret = process.env.FAUNADB_SECRET
let endpoint = process.env.FAUNADB_ENDPOINT

if(typeof secret === 'undefined' || secret === ''){
    console.error('The FAUNADB_SECRET env variable missing, exiting')
    process.exit(1)
}

if(!endpoint) endpoint = 'https://db.fauna.com'

let mg, domain, port, scheme

if ((mg = endpoint.match(/^(https?):\/\/([^:]+)(:(\d+))?/))) {
    scheme = mg[1] || 'https'
    domain = mg[2] || 'db.fauna.com'
    port = mg[4] || 443
}

const client = new faunadb.Client({
    secret,
    domain,
    port,
    scheme
})

const collectionName = `myCollection4`
try {
    let response = await client.query(
        q.CreateCollection({ name: collectionName })
    
    )
let response1 = await client.query(
    q.Create(
      q.Collection(collectionName),
      { data: { testField: 'testValue' } }
    )
  )



console.log(response)    

console.log(response1)
}
catch (e){
    console.log(e)
}




})()