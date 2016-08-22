import React from 'react'

export default class Cursos extends React.Component {
  render () {
    return (
      <div>
        <h2 className="title">Cursos</h2>
        {this.props.children}
      </div>
    )
  }
}
