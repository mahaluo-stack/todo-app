import { TodoFields } from "../classes/todo";

export type GridDate = {
    key: Date;
    dateString: string;
    date: number;
    monthClass: string;
    todayClass: string;
    todoList?: Array<TodoFields>;
    id: string;
  }