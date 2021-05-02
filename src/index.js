import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './ServiceWorker';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const Root = () => 
{
  return (
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
    </Switch>
  </Router>
  )
}

ReactDOM.render(
  <Root></Root>,
document.getElementById('root')
)