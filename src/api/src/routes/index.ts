import express, { Router } from 'express';
import { todoRouter } from './todo/todo.router';

const appRouter: Router = express.Router();

appRouter.use('/todo', todoRouter);

export { appRouter };
