import React from "react";
import { TodoItem } from "./TodoItem.model";
import "./Todo.css";
import TodoForm from "./TodoForm";


export interface TodoProps extends TodoItem {
  check: (id: string) => void;
  updateTodoText: (id: string, text: string) => void;
  delete: (id: string) => void;
}

interface TodoState {
  editing: boolean;
  deleting: boolean;
  shrinking: boolean;
}

class Todo extends React.Component<TodoProps> {
  state: TodoState = {
    editing: false,
    deleting: false,
    shrinking: false
  };

  handleSubmit = (item: TodoItem) => {
    this.props.updateTodoText(item.id, item.todoText);
    this.disableEdit();
  };

  enableEdit = () => this.setState({ editing: true });

  disableEdit = () => this.setState({ editing: false });

  delete = () => this.setState(() => {
    setTimeout(
      () => this.setState(() => {
        setTimeout(
          () => this.props.delete(this.props.id),
          500
        );
        return {shrinking: true};
      }),
      300
    );
    return {deleting : true};
  })


  handleTextClick = () => {
      if (!this.props.checked) this.props.check(this.props.id);
  }

  private get todoClasses() {
    return "Todo" +
    (this.state.deleting ? " deleting" : "") +
    (this.state.shrinking ? " shrinking" : "")
  };


  buildContent = () => this.state.editing ? (
    <div className="edit-form">
      <TodoForm
        submitTodo={this.handleSubmit}
        initialItem={this.props}
      ></TodoForm>
    </div>
  ) : (
    <div className="row">
      <div className="todoText" onClick={this.handleTextClick}>
        <span className={this.props.checked ? " checked" : ""}>{this.props.todoText}</span>
      </div>
      <i className="fas fa-edit" onClick={this.enableEdit}></i>
      <i className="fas fa-trash" onClick={this.delete}></i>
    </div>
  );

  render() {
    return (
      <div className={this.todoClasses}>
        {this.buildContent()}
      </div>
    );
  }
}

export default Todo;
