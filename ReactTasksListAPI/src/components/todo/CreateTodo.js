import React from 'react';

export default class CreateTodo extends React.Component {

  constructor(){
    super();

    this.state = {
      error: null,
    }
  }

  handleCreate(event){
    event.preventDefault();

    const inputTodo = this.refs.inputTodo;
    const task = inputTodo.value;
    const validateForm = this.validateForm(task);

    if (validateForm){
      this.setState({ error: validateForm })
    }else{
      this.props.createTodo(task);
      inputTodo.value = '';
      this.setState({ error: null })
    }
  }

  validateForm(task){
    if (task == null || task == '') {
      return 'Por favor, informe a descrição da tarefa.'
    }
    return null;
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="O que preciso fazer?" ref="inputTodo" />
        <button>Cadastrar</button>
        {this.renderError()}
      </form>
    );
  }

  renderError(){
    if (this.state.error) {
      return (
        <div style={{color : 'red'}}>{this.state.error}</div>
      )
    }
    return null;
  }
}
