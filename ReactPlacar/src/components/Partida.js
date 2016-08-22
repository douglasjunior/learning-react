import React from 'react'

export default class Partida extends React.Component {

  render () {
    return (
      <div>
        <h2>{this.props.estadio}</h2>
        <div>
          <span>{this.props.data}</span>
          <span> - </span>
          <span>{this.props.horario}</span>
        </div>
      </div>
    );
  }
}
