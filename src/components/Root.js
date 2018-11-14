import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';

var firstEntry =0;
var c;
var style = {
  onDrawerOpen: {
      marginLeft: 240
  },
  onDrawerClose: {
    marginLeft: 0
  }
};

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
    // document.getElementById('main-container').style = {{"marginLeft": "240"}};
  };

  handleDrawerClose = () => {
    this.setState({ open: false });  
    // document.getElementById('main-container').style={{"height" : "100%"}};
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
                // console.log("Array After updation is : ", this.state.arrayvar[(this.state.arrayvar.length)-2]);
                this.loadCanvas();
        })
  };

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerWidth;
      this.state.arrayvar.map((item,index) =>{
        for( var i = index; i< (index+1); i++){
          if (firstEntry !== 0) {
            c = canvas[i].getContext('2d');
            c.fillText(item.inputValue, (canvas[i].width)/2,(canvas[i].height)/2);
          }
          if(firstEntry === 0) {
            c = canvas[i].getContext('2d');
            c.fillText(item.inputValue, (canvas[i].width)/2,(canvas[i].height)/2);
            firstEntry = 1;
          }
        }
      })
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

        <CanvasContainer objArray = {this.state.arrayvar} open={this.state.open}/>
      </div> 
    );
  }
}

export default Root;