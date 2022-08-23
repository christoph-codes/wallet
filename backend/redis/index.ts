import { Client } from 'redis-om';
import 'dotenv/config';

/* pulls the Redis URL from .env */
const url = process.env.NODE_ENV === 'development' ? 'redis://localhost:6379' : process.env.REDIS_URL;
console.log('url', process.env.REDIS_URL);
/* create and open the Redis OM Client */
const client = await new Client().open(url)

export default client;