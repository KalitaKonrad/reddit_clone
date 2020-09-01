import 'reflect-metadata';
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PostResolver, UserResolver } from './resolvers';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from './types';
import cors from 'cors';
import { createConnection } from 'typeorm';

if (__prod__) {
  require('dotenv').config();
}

const main = async () => {
  const conn = await createConnection();

  await conn.runMigrations().catch(() => console.log('Migrations crashed!'));

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        secure: __prod__, // cookie only works in https
        sameSite: 'lax',
      },
      secret: 'randomString',
      saveUninitialized: false,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext =>
      <MyContext>{
        req,
        res,
        redis,
      },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch(err => {
  console.error(err);
});
