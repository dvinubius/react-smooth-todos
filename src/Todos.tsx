import React from "react";
import "./Todos.css";
import { TodoItem } from "./TodoItem.model";
import Todo from "./Todo";

export interface TodosProps {
  todos: TodoItem[];
  checkTodo: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
}

class Todos extends React.Component<TodosProps> {
  

  buildTodos = () =>
    this.props.todos.length === 0 
      ? <div style={{height: 1, backgroundColor: "transparent"}}></div>
      : this.props.todos.map((item: TodoItem) => (
        <div className="padded">
          <Todo
            id={item.id}
            key={item.id}
            todoText={item.todoText}
            checked={item.checked}
            check={this.props.checkTodo}
            updateTodoText={this.props.updateTodoText}
            delete={this.props.deleteTodo}
          ></Todo>
        </div>
      ));

  render() {
    return (
      <div className="Todos">
          {this.buildTodos()}
      </div>
    );
  }
}

export default Todos;
