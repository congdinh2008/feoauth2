import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../models/todo.model';

const todoSchema = new Schema({
  title: String,
  isCompleted: Boolean
});

const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);

export class TodoService {
  public static getAll(): Promise<ITodo[]> {
    return TodoModel.find().exec();
  }

  public static getById(id: ITodo['_id']): Promise<ITodo | null> {
    return TodoModel.findById(id).exec();
  }

  public static create(todo: ITodo): Promise<ITodo> {
    return new TodoModel({
      title: todo.title,
      isCompleted: todo.isCompleted
    }).save();
  }

  public static edit(id: ITodo['_id'], todo: ITodo): Promise<ITodo | null> {
    return TodoModel.findByIdAndUpdate(id, { title: todo.title, isCompleted: todo.isCompleted }, { new: true }).exec();
  }

  public static delete(id: ITodo['_id']): Promise<any> {
    return TodoModel.remove({ _id: id }).exec();
  }
}
