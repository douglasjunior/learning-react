import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Layout from "./pages/Layout";
import Featured from "./pages/Featured";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout} >
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives(/:article)" component={Archive}></Route>
      <Route path="settings" component={Settings}></Route>
    </Route>
  </Router>,
app);
