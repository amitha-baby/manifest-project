import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';

const drawerWidth = 240;
var width = ((window.innerWidth)/2) - 50;
var height =  ((window.innerHeight)/2) - 50;
var minLeftBorder = 20;
var leftBorder = 500;
var x = minLeftBorder;
var y = minLeftBorder;
var c;

class Root extends Component {
  constructor(){
    super();
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      countField: 1, 
      arrayvar : [ 
        // {id:this.nextUniqueId,inputValue: ''},
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
            console.log("Array After updation is : ", this.state.arrayvar);
            this.load();
        })
  };

  load() {
    if(this.state.open === "true") {
      x =  drawerWidth + minLeftBorder;
    }
    var canvases = document.getElementsByClassName('square-canvas');
   
    for( var i=0; i<canvases.length; i++){
        c = canvases[i].getContext('2d');
        canvases.width = width;
        canvases.height = height;
        c.strokeStyle = "black";
        c.strokeRect(x,y,canvases.width,canvases.height);
        // caches.lineWidth = 15;
        // console.log(this.state.arrayvar,i);
        // c.fillText(this.state.arrayvar, width/2,height/2);
        c.stroke();    
    }
}


  deleteInput(index,e){
    console.log("index for deletion ", index)
    const arrayvar = Object.assign([],this.state.arrayvar);
    arrayvar.splice(index,1);
    this.setState({arrayvar:arrayvar}); 
  }

  changeValue(index,e){
    const arrayobj= Object.assign({},this.state.arrayvar[index]);
    arrayobj.inputValue = e.target.value;
    const arrayvar = Object.assign([],this.state.arrayvar);
    arrayvar[index] = arrayobj;
    this.setState({arrayvar:arrayvar}); 
  }

  render() {
    return( 
      <div>
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
        <CanvasContainer objArray = {this.state.arrayvar} open={this.handleDrawerOpen}/>
     
      </div> 
    );
  }
}

export default Root;