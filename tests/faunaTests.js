import test from 'tape'
import dotenv from 'dotenv';
dotenv.config() //read env variables from the .env file

import { deleteDatabase, getClient } from '../faunaDbGateway.js'
import { createDatabase } from '../faunaDbGateway.js'



test('Env variable is set', function (t) {
    t.ok(process.env.FAUNADB_SECRET)
    t.end()
});


test('Can initialize client', async (t) => {
    const adminClient = getClient(process.env.FAUNADB_SECRET)
    t.equal(adminClient._http._secret, process.env.FAUNADB_SECRET )
    t.end()
})

test('Can create/delete database', async (t) => {
    const dbName = 'myTestDB'
    const adminClient = await getClient(process.env.FAUNADB_SECRET)
    const response = await createDatabase(adminClient, dbName)
    t.equal(response.name, dbName)

    const deleteDBResponse = await deleteDatabase(adminClient, dbName)
    t.equal(response.name, dbName)

    t.end()
})
