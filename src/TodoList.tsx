import React from "react";
import "./TodoList.css";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem.model";
import { StorageService } from "./storage.service";

interface TodoListState {
  todos: TodoItem[];
}

export class TodoList extends React.Component {
  state: TodoListState = {
    todos: StorageService.getStoredTodos(),
  };

  addTodo = (todo: TodoItem) => {
    this.setState((current: TodoListState) => ({
      todos: [...current.todos, todo],
    }));
    StorageService.addTodo(todo);
  }

  deleteTodo = (targetId: string) => {
    this.setState((current: TodoListState) => ({
      todos: current.todos.filter(
        (item: TodoItem) => item.id !== targetId
      ),
    }));
    StorageService.deleteTodo(targetId);
  }

  checkTodo = (id: string) => {
    this.setState((current: TodoListState) => ({
      todos: current.todos.map((todo: TodoItem) =>
        todo.id === id ? { ...todo, checked: true } : todo
      ),
    }));
    const targetItem = this.state.todos.find(el => el.id === id);
    if (!targetItem) {return;}
    StorageService.updateTodo(
      {...targetItem, checked: true}
    );
  }

  updateTodoText = (id: string, text: string) => {
    this.setState((current: TodoListState) => ({
      todos: current.todos.map((todo: TodoItem) =>
        todo.id === id ? { ...todo, todoText: text } : todo
      ),
    }));
    const targetItem = this.state.todos.find(el => el.id === id);
    if (!targetItem) {return;}
    StorageService.updateTodo(
      {...targetItem, todoText: text}
    );
  }

  render() {
    return (
      <div className="TodoList">
        <div className="titlePanel">
          <h1 className="title">Todo List</h1>
          <p className="description">A <i>Smooth</i> Experience.</p>
          <div className="bottomLine"></div>
        </div>
            <Todos
            todos={this.state.todos}
            checkTodo={this.checkTodo}
            updateTodoText={this.updateTodoText}
            deleteTodo={this.deleteTodo}
            ></Todos>
        <div className="add-form">
          <TodoForm submitTodo={this.addTodo}></TodoForm>
        </div>
      </div>
    );
  }
}

export default TodoList;
