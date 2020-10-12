import { Request, Response } from 'express';
import { ITodo } from '../models/todo.model';
import { TodoService } from '../services/todo.services';

export class TodoController {
  public static async getAll(req: Request, res: Response) {
    const todoList = await TodoService.getAll();
    res.json({ todoList });
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await TodoService.getById(id);
    res.status(200).json({ todo });
  }

  public static async create(req: Request, res: Response) {
    const { title, isCompleted } = req.body;
    const todo: ITodo | undefined = await TodoService.create({ title, isCompleted } as ITodo);
    res.status(201).json({ data: todo });
  }

  public static async edit(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ message: 'Todo not found!' });
    }
    const { title, isCompleted } = req.body;
    await TodoService.edit(id, { title, isCompleted } as ITodo);
    res.status(204).json({ message: 'Update Success!' });
  }

  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ message: 'Todo not found!' });
    }
    const todo = await TodoService.delete(id);
    res.status(204).json({ message: 'Delete Success' });
  }
}
