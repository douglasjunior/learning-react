import React from 'react'

const cursos = [
  {nome: "React"},
  {nome: "Redux"},
  {nome: "NodeJS"},
  {nome: "React Native"}
]


export default class Curso extends React.Component {
  render () {
    return (
      <div>
        <h3 className="title">{cursos[this.props.params.id].nome}</h3>
      </div>
    )
  }
}
