export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  priority: string;
  isCompleted?: boolean;
}
