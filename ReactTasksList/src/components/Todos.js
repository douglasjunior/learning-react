import React from 'react';

import _ from 'lodash';
import TodosHeader from './TodosHeader';
import Todo from './Todo';

export default class Todos extends React.Component {

  renderItems(){
    return _.map(this.props.todos,
      (todo, index) => <Todo key={index} {...todo} index={index}
        toggleTodo={this.props.toggleTodo.bind(this)}
        saveTodo={this.props.saveTodo.bind(this)}
        deleteTodo={this.props.deleteTodo.bind(this)} />
    );
  }

  render() {
    console.log(this.props.todos)

    return (
      <table>
        <TodosHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}
