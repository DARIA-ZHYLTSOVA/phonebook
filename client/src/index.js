import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App.jsx';
import printContact from './components/pageContact.jsx';
import Login from './components/login.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// render application and routing
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Contacts' component={App} />
        <Route path='/Contact/:id' component={printContact} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
