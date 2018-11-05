import React, { Component } from 'react';
import Header from './components/Header/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Canvas from './components/Header/Canvas/Canvas';

class App extends Component {
  render() {
    return( 
      <div>
        <CssBaseline />
        <Header />
        <Canvas />
        {/* <Footer /> */}
      </div> 
    );
  }
}

export default App;