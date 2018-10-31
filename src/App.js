import React, { Component } from 'react';
import SideBar from './components/SideBar/SideBar';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  render() {
    return( 
      <div>
        <NavBar />
        <SideBar />
      </div> 
    );
  }
}

export default App;