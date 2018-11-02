import React, { Component } from 'react';
import LeftDrawer from './LeftDrawer/LeftDrawer';
import GraphContainer from './GraphContainer/GraphContainer';

export default class MainContainer extends Component {
  render() {
  return(
    <div>
      <LeftDrawer />
      <GraphContainer name="abc"/>
    </div>
    
  );
  }
}

//export default MainContainer;