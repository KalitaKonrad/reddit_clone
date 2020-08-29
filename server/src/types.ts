import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
};
