import faunadb from 'faunadb';
const { query: q } = faunadb;

export const getClient = (secret) => {
    return new faunadb.Client({ secret: process.env.FAUNADB_SECRET} ); 
}

export const createDatabase = async (adminClient, databaseName) => {
    // One-time

    const createDBResponse = await adminClient.query(
      q.CreateDatabase({ name: databaseName })
    )   
    
    return createDBResponse
}

export const deleteDatabase = async (adminClient, databaseName) => {
    const deleteDBResponse = adminClient.query(
        q.Delete(q.Database(databaseName))
    )

    return deleteDBResponse
}