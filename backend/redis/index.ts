import { createClient } from 'redis'
import { Client } from 'redis-om'

const redis = createClient({url: process.env.redisURL});
await redis.connect()
const client = await new Client().use(redis);

// await redis.set('foo', 'bar')
// const value = await client.execute(['GET', 'foo'])

export default client;