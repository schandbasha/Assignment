import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import Index from './Components/index';
import Home from './Components/Home/Home';
// import './style.css';

const App = ({ title }) =>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark primary-color navbar-fixed-top">
            <div className="container-fluid">
            <NavLink to={'/'} >
              <a className="navbar-brand" href="/">BMW Logo</a>
            </NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="basicExampleNav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                  <NavLink to={'/'} activeStyle={{color: "#FFF"}} exact >
                    <a className="nav-link" href="/">About</a>
                  </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink to={'/automobile'} activeStyle={{color: "#FFF"}} exact>
                    <a className="nav-link" href="/automobile">Automobile Parts</a>
                  </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/automobile' component={Index} />
          </Switch>
        </div>
      </Router>

export default App;