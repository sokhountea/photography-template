import React, { Component } from 'react';
import './App.scss';

// Packages
import { Route } from 'react-router-dom';

// Components
import Home from './Home';
import Portfolio from './components/Portfolio/Portfolio'
import Contact from './components/Contact/Contact'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/portfolio">
          <Portfolio />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>
      </div>
    )
  }
}

export default App;
