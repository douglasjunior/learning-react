import React from 'react';

import Request from 'superagent';
import _ from 'lodash';

import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

const URL_REST = 'http://localhost:8080/JavaTodoApi/rest/todos/';

export default class TodosIndex extends React.Component {
  constructor(){
    super();

    this.state = {
      todos: []
    };
  }

  componentWillMount(){
    Request
      .get(URL_REST)
      .then((response) => {
        this.setState({
          todos: response.body
        })
      });
  }

  createTodo(task){
    Request
      .post(URL_REST)
      .send({ task: task })
      .then((response) => {
        this.state.todos.push(response.body);
        this.setState({ todos: this.state.todos });
      });
  }

  toggleTodo(index){
    const todo = this.state.todos[index];
    Request
      .put(URL_REST + todo.id + "/toggle")
      .then((response) => {
        const t = _.find(this.state.todos, { id: response.body.id });
        t.completed = response.body.completed;
        this.setState({ todos: this.state.todos });
      });
  }

  saveTodo(index, newTask){
    const todo = this.state.todos[index];
    Request
      .put(URL_REST + todo.id)
      .send({ task: newTask })
      .then((response) => {
        const t = _.find(this.state.todos, { id: response.body.id });
        t.task = response.body.task;
        this.setState({ todos: this.state.todos });
      });
  }

  deleteTodo(index){
    const todo = this.state.todos[index];
    Request
      .delete(URL_REST + todo.id)
      .then((response) => {
        _.remove(this.state.todos, (t) => {
           return t.id == response.body.id;
        });
        this.setState({ todos: this.state.todos });
      });
  }

  render() {
    return (
      <div>
        <CreateTodo createTodo={this.createTodo.bind(this)} />
        <TodoList todos={this.state.todos}
                 toggleTodo={this.toggleTodo.bind(this)}
                 saveTodo={this.saveTodo.bind(this)}
                 deleteTodo={this.deleteTodo.bind(this)} />
      </div>
    );
  }
}
