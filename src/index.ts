import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities';
import microConfig from './mikro-orm.config';
import { __prod__ } from './constants';

if (__prod__) {
  require('dotenv').config();
}

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
};

main().catch(err => {
  console.error(err);
});
