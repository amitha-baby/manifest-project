import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';

const drawerWidth = 240;
var canvasWidth = ((window.innerWidth)/2) - 50;
var canvasHeight = ((window.innerHeight)/2) - 50;
var minLeftBorder = 20;
var leftBorder = 500;
var x = minLeftBorder;
var y = minLeftBorder;
var firstEntry =0;
var expressionValues ={};
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
    // document.getElementById('main-container').style.marginLeft = '240px';
  };

  handleDrawerClose = () => {
    this.setState({ open: false });  
    // document.getElementById('main-container').style.marginLeft = '0';
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
                console.log("Array After updation is : ", this.state.arrayvar[(this.state.arrayvar.length)-2]);
                this.loadCanvas();
        })
  };

  // regExpCheck(value) {
  //   var inputStr = value;
  //   var patt = /[a-z]+/;
  //   var result = patt.test(inputStr);
  //   console.log(result,value);
  //   if(result === false)
  //   {
  //     return inputStr;
  //   }
  //   else {
  //     // console.log("true case");
  //     var patt1 = /[a-z]+/;
  //     var varResult = patt1.exec(inputStr);
  //     var patt2 = /[0-9]+/;
  //     var numResult = patt2.exec(inputStr);
  //     expressionValues[varResult]= numResult;
  //     return(expressionValues[varResult]);
  //   }
  // }

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerWidth;
      this.state.arrayvar.map((item,index) =>{
        for( var i = index; i< (index+1); i++){
          if (firstEntry !== 0) {
            c = canvas[i].getContext('2d');
            console.log("index",index);
            canvas[i].width  = canvasWidth; 
            canvas[i].height = canvasHeight;
            console.log(canvas[i].width,canvas[i].height);
            // this.regExpCheck(item.inputValue);
            c.fillText(item.inputValue, (canvas[i].width)/2,(canvas[i].height)/2);
          }
          if(firstEntry === 0) {
            c = canvas[i].getContext('2d');
            console.log("index 0",index);
            canvas[i].width  = (window.innerWidth) -100;
            canvas[i].height = (window.innerWidth) -100;
            // this.regExpCheck();
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
        <CanvasContainer objArray = {this.state.arrayvar} open={this.handleDrawerOpen}/>
     
      </div> 
    );
  }
}

export default Root;