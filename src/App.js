import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return( 
      <div>
        <CssBaseline />
        <Header />
        <MainContainer />
        {/* <Footer /> */}
      </div> 
    );
  }
}

export default App;