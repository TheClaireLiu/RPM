import { createClient } from 'redis';

let redisClient;

if (!redisClient) {
  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  redisClient.connect();
}

export default redisClient;
