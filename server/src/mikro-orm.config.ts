import { Post, User } from './entities';
import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: 'reddit',
  user: 'postgres',
  password: 'postgres',
  debug: !__prod__,
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];