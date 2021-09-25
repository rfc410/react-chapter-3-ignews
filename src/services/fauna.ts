import { Client } from 'faunadb'

// https://stackoverflow.com/questions/68484082/faunadb-application-returns-401-but-credentials-are-fine
export const fauna = new Client({
  domain: 'db.us.fauna.com',
  scheme: 'https',
  secret: process.env.FAUNADB_KEY
})
