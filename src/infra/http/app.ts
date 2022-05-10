import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import 'dotenv/config';

import createConnection from '@infra/database/typeorm';
import { routes } from './routes';
import '@infra/container/index';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

export { app };
