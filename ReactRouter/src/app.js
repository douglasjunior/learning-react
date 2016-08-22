import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory }  from 'react-router';

import App from './pages/App'
import Home from './pages/Home'
import Cursos from './pages/Cursos'
import Sobre from './pages/Sobre'

import Curso from './components/Curso'

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="cursos" component={Cursos} >
          <Route path=":id" component={Curso} />
        </Route>
        <Route path="sobre" component={Sobre} />
      </Route>
    </Router>
  ),
  document.getElementById("app")

);
