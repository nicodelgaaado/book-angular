import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Labs } from './pages/labs/labs';
import { TodoList } from './todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'inicio',
    component: Home,
  },
  {
    path: 'lab',
    component: Labs,
  },
  {
    path: 'labs',
    component: Labs,
  },
  {
    path: 'todo-list',
    component: TodoList,
  },
  {
    path: 'todos',
    component: TodoList,
  },
];
