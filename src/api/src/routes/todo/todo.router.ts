import express, { Router } from 'express';

import { TodoController } from '../../controllers/todo.controller';

const todoRouter: Router = express.Router();

todoRouter.get('/', TodoController.getAll);
todoRouter.get('/:id', TodoController.getById);
todoRouter.post('/', TodoController.create);
todoRouter.delete('/:id', TodoController.delete);
todoRouter.patch('/:id', TodoController.edit);

export { todoRouter };
