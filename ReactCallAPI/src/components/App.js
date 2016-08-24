import React from 'react';

import TodoIndex from './todo/TodoIndex';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Aplicativo de Lista de Tarefas</h1>
        <TodoIndex />
      </div>
    );
  }
}
