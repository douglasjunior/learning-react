import React from 'react';

import Request from 'superagent';
import _ from 'lodash';

import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

const REST_URL = 'http://localhost:8080/JavaTasksListAPI/rest/todos/';
const REST_TIMEOUT = 5000;

export default class TodosIndex extends React.Component {
  constructor(){
    super();

    this.state = {
      todos: null,
      loading: "Carregando..."
    };
  }

  componentDidMount(){
    setTimeout(() => {
      this.loadTodos();
    })
  }

  loadTodos(){
    this.setState({
      todos: null,
      loading: "Carregando..."
    })
    Request
      .get(REST_URL)
      .timeout(REST_TIMEOUT)
      .withCredentials()
      .end((error, response) => {
        var state = {};
        if (response){
          state.todos = response.body;
        } else {
          state.loading = "Um erro inesperado ocorreu, por favor, recarregue a página.";
        }
        this.setState(state);
      });
  }

  createTodo(task){
    Request
      .post(REST_URL)
      .withCredentials()
      .send({ task: task })
      .then((response) => {
        this.state.todos.push(response.body);
        this.setState({ todos: this.state.todos });
      });
  }

  toggleTodo(index){
    const todo = this.state.todos[index];
    Request
      .put(REST_URL + todo.id + "/toggle")
      .withCredentials()
      .then((response) => {
        const t = _.find(this.state.todos, { id: response.body.id });
        t.completed = response.body.completed;
        this.setState({ todos: this.state.todos });
      });
  }

  saveTodo(index, newTask){
    const todo = this.state.todos[index];
    Request
      .put(REST_URL + todo.id)
      .withCredentials()
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
      .delete(REST_URL + todo.id)
      .withCredentials()
      .then((response) => {
        _.remove(this.state.todos, (t) => {
           return t.id == response.body.id;
        });
        this.setState({ todos: this.state.todos });
      });
  }

  render() {
    if (this.state.todos == null) {
      return (
        <div>
          <button onClick={this.loadTodos.bind(this)}>Recarregar</button> <br />
          {this.state.loading}
        </div>
      );
    }
    return (
      <div>
        <button onClick={this.loadTodos.bind(this)}>Recarregar</button> <br />
        <CreateTodo createTodo={this.createTodo.bind(this)} />
        <TodoList todos={this.state.todos}
                 toggleTodo={this.toggleTodo.bind(this)}
                 saveTodo={this.saveTodo.bind(this)}
                 deleteTodo={this.deleteTodo.bind(this)} />
      </div>
    );
  }
}
