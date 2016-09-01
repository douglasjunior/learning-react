import 'react-toolbox/lib/commons.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';

const App = () => (
    <Home />
);

ReactDOM.render(<App />, document.getElementById("app"));
