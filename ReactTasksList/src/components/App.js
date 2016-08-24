import React from 'react';

import Todos from './Todos';
import CreateTodo from './CreateTodo';

const todos = [
  {
    task: 'make react tutorial',
    isCompleted: false
  },
  {
    task: 'make angular tutorial 2',
    isCompleted: true
  },
  {
    task: 'make node tutorial 3',
    isCompleted: false
  }
];

export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      todos
    };
  }

  createTodo(task){
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({ todos: this.state.todos });
  }

  toggleTodo(index){
    const todo = this.state.todos[index];
    todo.isCompleted = !todo.isCompleted;
    this.setState({ todos: this.state.todos });
  }

  saveTodo(index, newTask){
    const todo = this.state.todos[index];
    todo.task = newTask;
    this.setState({ todos: this.state.todos });
  }

  deleteTodo(index){
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos });
  }

  render() {
    return (
      <div>
        <h1>Aplicativo de Lista de Tarefas</h1>
        <CreateTodo createTodo={this.createTodo.bind(this)} />
        <Todos todos={this.state.todos}
               toggleTodo={this.toggleTodo.bind(this)}
               saveTodo={this.saveTodo.bind(this)}
               deleteTodo={this.deleteTodo.bind(this)} />
      </div>
    );
  }
}
