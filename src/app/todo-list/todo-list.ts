import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.model';

type TodoFilter = 'all' | 'pending' | 'completed';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-todo-list',
  styleUrl: './todo-list.scss',
  templateUrl: './todo-list.html',
})
export class TodoList implements OnInit {
  public todos = signal<Todo[]>([
    {
      id: 1,
      title: 'Comprar víveres',
      description: 'Comprar leche, huevos, pan y verduras en el supermercado local.',
      dueDate: '2026-06-05',
      category: 'Personal',
      priority: 'high',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Revisar informes mensuales',
      description: 'Analizar las métricas de ventas del último trimestre y preparar el reporte.',
      dueDate: '2026-06-07',
      category: 'Trabajo',
      priority: 'high',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Rutina de ejercicio',
      description: 'Completar 45 minutos de cardio y estiramientos en casa.',
      dueDate: '2026-06-04',
      category: 'Salud',
      priority: 'medium',
      isCompleted: false,
    },
    {
      id: 4,
      title: 'Pagar servicios públicos',
      description: 'Realizar el pago online de la factura de electricidad y agua.',
      dueDate: '2026-06-10',
      category: 'Hogar',
      priority: 'high',
      isCompleted: false,
    },
    {
      id: 5,
      title: 'Actualizar portafolio',
      description: 'Subir los últimos proyectos desarrollados a la página web personal.',
      dueDate: '2026-06-15',
      category: 'Estudio',
      priority: 'low',
      isCompleted: false,
    },
    {
      id: 6,
      title: 'Llamar al médico',
      description: 'Agendar cita de control general anual con el doctor.',
      dueDate: '2026-06-08',
      category: 'Salud',
      priority: 'medium',
      isCompleted: false,
    },
    {
      id: 7,
      title: 'Limpiar la oficina',
      description: 'Organizar el escritorio, botar papeles innecesarios y limpiar la pantalla.',
      dueDate: '2026-06-06',
      category: 'Hogar',
      priority: 'low',
      isCompleted: false,
    },
    {
      id: 8,
      title: 'Reunión con equipo de desarrollo',
      description: 'Discutir los avances del sprint actual y asignar nuevas tareas.',
      dueDate: '2026-06-04',
      category: 'Trabajo',
      priority: 'high',
      isCompleted: false,
    },
    {
      id: 9,
      title: 'Leer un libro',
      description: 'Avanzar al menos dos capítulos del libro de arquitectura de software.',
      dueDate: '2026-06-12',
      category: 'Personal',
      priority: 'low',
      isCompleted: true,
    },
    {
      id: 10,
      title: 'Planificar viaje de vacaciones',
      description: 'Cotizar vuelos y hospedaje para las próximas vacaciones de fin de año.',
      dueDate: '2026-06-20',
      category: 'Personal',
      priority: 'medium',
      isCompleted: false,
    },
  ]);

  public tempTodo = {
    title: '',
    description: '',
    priority: 'medium',
  };

  public filter: TodoFilter = 'all';
  public editingId: number | null = null;
  public editTodo = {
    title: '',
    description: '',
    priority: 'medium',
  };

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    try {
      const savedTodos = window.localStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos) as Todo[];
        if (Array.isArray(parsedTodos) && parsedTodos.length > 0) {
          this.todos.set(parsedTodos);
          return;
        }
      }
      this.saveTodos();
    } catch (error) {
      console.warn('No se pudo acceder a localStorage:', error);
    }
  }

  get totalCount(): number {
    return this.todos().length;
  }

  get pendingCount(): number {
    return this.todos().filter((todo) => !todo.isCompleted).length;
  }

  get completedCount(): number {
    return this.todos().filter((todo) => todo.isCompleted).length;
  }

  filteredTodos(): Todo[] {
    if (this.filter === 'pending') {
      return this.todos().filter((todo) => !todo.isCompleted);
    }

    if (this.filter === 'completed') {
      return this.todos().filter((todo) => todo.isCompleted);
    }

    return this.todos();
  }

  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  addTodo() {
    const title = this.tempTodo.title.trim();
    if (!title) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title,
      description: this.tempTodo.description || '',
      dueDate: '',
      category: 'Personal',
      priority: this.tempTodo.priority || 'medium',
      isCompleted: false,
    };

    this.todos.update((todos) => [...todos, newTodo]);
    this.tempTodo = { title: '', description: '', priority: 'medium' };
    this.saveTodos();
  }

  startEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editTodo = {
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    };
  }

  cancelEdit() {
    this.editingId = null;
    this.editTodo = { title: '', description: '', priority: 'medium' };
  }

  saveEdit() {
    if (this.editingId === null) {
      return;
    }

    const title = this.editTodo.title.trim();
    if (!title) {
      return;
    }

    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === this.editingId
          ? {
              ...todo,
              title,
              description: this.editTodo.description || '',
              priority: this.editTodo.priority || 'medium',
            }
          : todo
      )
    );

    this.cancelEdit();
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));

    if (this.editingId === id) {
      this.cancelEdit();
    }

    this.saveTodos();
  }

  setColorPriority(priority: string) {
    switch (priority) {
      case 'low':
        return 'priority-low';
      case 'medium':
        return 'priority-medium';
      case 'high':
        return 'priority-high';
      default:
        return '';
    }
  }

  onChangeCompleted(event: Event, todo: Todo) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    this.todos.update((todos) =>
      todos.map((item) => (item.id === todo.id ? { ...item, isCompleted: isChecked } : item))
    );

    this.saveTodos();
  }

  trackById(_index: number, todo: Todo) {
    return todo.id;
  }

  private saveTodos() {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem('todos', JSON.stringify(this.todos()));
    } catch (error) {
      console.warn('No se pudo guardar en localStorage:', error);
    }
  }
}
