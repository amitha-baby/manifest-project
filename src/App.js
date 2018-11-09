import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Root from './components/Root';
import CanvasContainer from './components/CanvasContainer/CanvasContainer';

class App extends Component {
  render() {
    return(
      <Router>
        <div className="App ">
          <Route path= {"/"} exact component={Root}/>  
        </div>
      </Router>
    );
  }
}

export default App;

