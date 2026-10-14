import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoList } from './todo-list';

describe('TodoList', () => {
  let component: TodoList;
  let fixture: ComponentFixture<TodoList>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [TodoList],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new task', () => {
    const before = component.todos().length;
    component.tempTodo = { title: 'Nueva tarea de prueba', priority: 'high' };

    component.addTodo();

    expect(component.todos().length).toBe(before + 1);
    expect(component.todos().some((todo) => todo.title === 'Nueva tarea de prueba')).toBeTrue();
  });

  it('should delete a task', () => {
    const taskId = component.todos()[0].id;
    const before = component.todos().length;

    component.deleteTodo(taskId);

    expect(component.todos().length).toBe(before - 1);
    expect(component.todos().some((todo) => todo.id === taskId)).toBeFalse();
  });

  it('should toggle completed state', () => {
    const task = component.todos()[0];
    const event = { target: { checked: true } } as unknown as Event;

    component.onChangeCompleted(event, task);

    expect(task.isCompleted).toBeTrue();
    expect(component.todos().find((todo) => todo.id === task.id)?.isCompleted).toBeTrue();
  });

  it('should filter completed tasks', () => {
    component.todos.update((todos) =>
      todos.map((todo, index) => ({ ...todo, isCompleted: index % 2 === 0 }))
    );

    component.setFilter('completed');

    expect(component.filteredTodos().every((todo) => todo.isCompleted)).toBeTrue();
  });
});
