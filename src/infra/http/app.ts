import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';

import createConnection from '@infra/database/typeorm';
import { routes } from './routes';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);

export { app };
