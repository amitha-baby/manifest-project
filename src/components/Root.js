import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';

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
                // console.log("Array After updation is : ", this.state.arrayvar);
                this.loadCanvas();
        })
  };

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      this.state.arrayvar.map((item,index) =>{
        for( var i = 0; i< canvas.length; i++){
            c = canvas[i].getContext('2d');
            // console.log("input value",item.inputValue);
            // this.evalExpression(item.inputValue);
            c.fillText(item.inputValue, (canvas[i].width)/2,(canvas[i].height)/2);
        }
      })
    }
  }

  deleteInput(index,e){
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

        <CanvasContainer objArray = {this.state.arrayvar} open={this.state.open}/>
      </div> 
    );
  }
}

export default Root;