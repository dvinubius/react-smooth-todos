import React from "react";
import { TodoItem, TodoSpecs } from "./TodoItem.model";
import { uuid } from "uuidv4";
import "./TodoForm.css";

export interface TodoFormProps {
  submitTodo: (item: TodoItem) => void;
  initialItem?: TodoItem;
}

interface FormState extends TodoSpecs {}

class TodoForm extends React.Component<TodoFormProps> {
  state: FormState = this.isForNewItem
    ? TodoForm.emptyState()
    : { todoText: this.props.initialItem?.todoText || "" };

  static emptyState = () => ({
    todoText: "",
  });

  private get isForNewItem(): boolean {
    return this.props.initialItem == null;
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (this.state.todoText === '') {
        return;
    }
    this.props.submitTodo({
      ...this.state,
      id: this.isForNewItem ? uuid() : this.props.initialItem?.id || uuid(),
      checked: false,
    });
    this.setState(TodoForm.emptyState());
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <form className="TodoForm" onSubmit={this.handleSubmit}>
        <label htmlFor="todoText"></label>
        <input
          type="text"
          id="todoText"
          name="todoText"
          value={this.state.todoText}
          onChange={this.handleChange}
          placeholder="New Todo"
        />

        <button type="submit" disabled={this.state.todoText === ''}>{this.isForNewItem ? "ADD TODO" : "SAVE"}</button>
      </form>
    );
  }
}

export default TodoForm;
