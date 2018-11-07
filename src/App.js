import React, { Component } from 'react';
import Header from './components/Header/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Canvas from './components/Header/Canvas/Canvas';
import SideBar from './components/Header/SideBar/SideBar';

class App extends Component {
  constructor(){
    super();
    this.state = {
      open: false,
      countField: 1, 
      arrayvar : [
        {id:this.nextUniqueId,inputValue: ''},
        {id:this.nextUniqueId,inputValue: ''}
      ]
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClick(e) {
    e.preventDefault();
    this.setState(
      { countField: this.state.countField + 1 ,
        arrayvar:[...this.state.arrayvar,
          {id:this.nextUniqueId,inputValue: ''}
        ]  
      },
        () => {
            console.log("Array After updation is : ", this.state.arrayvar)
        })
  };

  deleteInput = (index,e) => {
    // e.preventDefault();
    const arrayvar = Object.assign([],this.state.arrayvar);
    arrayvar.splice(index,1);
    this.setState({arrayvar:arrayvar}); 
  }

  changeValue(index,e){
    // e.preventDefault();
    const arrayobj= Object.assign({},this.state.arrayvar[index]);
    arrayobj.inputValue = e.target.value;
    console.log(arrayobj);
    const arrayvar = Object.assign([],this.state.arrayvar);
    arrayvar[index] = arrayobj;
    this.setState({arrayvar:arrayvar}); 
  }

  render() {
    return( 
      <div>
        <CssBaseline />
        <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>

        { (this.state.open === true)   &&
          <div>
            <SideBar 
              open= "true"
              arrayvar={this.state.arrayvar}
              countField={this.countField}
              handleDrawerClose={this.handleDrawerClose}
              deleteInput={this.deleteInput}
              changeValue={this.changeValue}
              handleClick={this.handleClick}
            />
          </div>
        }
          <Canvas objArray = {this.state.arrayvar}/>
      </div> 
    );
  }
}

export default App;