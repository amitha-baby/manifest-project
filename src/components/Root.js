import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import { string } from 'prop-types';

var ctx;
var scope ={};

class Root extends Component {
  constructor(){
    super();
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      countField: 1, 
      inputList : [ 
        // {id:this.nextUniqueId,inputValue: ''},
      ]
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleInputExpression = this.handleInputExpression.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });  
  };

  handleClickNewButton(e) {
    // e.preventDefault();
    this.setState(
      { countField: this.state.countField + 1 ,
        inputList:[...this.state.inputList,
          {id:this.nextUniqueId,inputValue: ''}
        ]  
      },
        () => {
                // console.log("Array After updation is : ", this.state.inputList);
                this.loadCanvas();
        })
  };

  handleKeyPressEnter = event => {
    if (event.key == 'Enter') {
      this.handleClickNewButton(event);
    }
  };

  handleInputExpression(inputExp) {
    
      if(inputExp === '')
      {
        return inputExp;
      }
      ;
      try {
        return math.eval(inputExp, scope);
      }
      catch(e)
      {
        return "undefined";
      }
    

      // var pattern = /[a-z]+/;
      // var pattern1 = /[0-9]+/;
      // if(pattern.test(inputExpression) === true) {
      // var splitByEqual = inputExpression.split("=");
      // console.log("splitByEqual",splitByEqual[0],splitByEqual[1]);
      // if(splitByEqual[1].split("+|-|*|/")) {
      //   var variableOfExp = pattern.exec(inputExpression);
      //   var valueOfExp = pattern1.exec(inputExpression);
      //   // console.log("variableOfExp",variableOfExp);
      //   scope[variableOfExp[0]] = valueOfExp[0];
      //  console.log((valueOfExp[0]));
      // console.log((scope));// }
      //  console.log(math.eval(inputExp, scope));
      // }
      // else {
      //   return inputExp;
      // }
  }

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      this.state.inputList.map((item,index) =>{
        for( var i = index; i< (index + 1); i++){
            ctx = canvas[i].getContext('2d');
            ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);
            var result = this.handleInputExpression(item.inputValue);
            ctx.font = "15px Arial";
            ctx.fillText(result, (canvas[i].width)/2,(canvas[i].height)/2);
        }
      })
    }
  }

  // deleteCanvas(deletedElement) {
  //   var canvas = document.getElementsByClassName('canvas-container');
  //   {
  //     this.state.inputList.map((item,index) =>{
  //       for( var i = index; i< (index + 1); i++){
  //         if(deletedElement !== index) {
  //           ctx = canvas[i].getContext('2d');
  //           // console.log("input value",item.inputValue);
  //           // this.evalExpression(item.inputValue);
  //           ctx.fillText(item.inputValue, (canvas[i].width)/2,(canvas[i].height)/2);
  //         }
  //       }
  //     })
  //   }
  // }

  deleteInput(index,e){
    console.log("index of deletion",index);
    const inputList = Object.assign([],this.state.inputList);
    console.log("index of deletion",index);

    inputList.splice(index,1);
    console.log("inputList",inputList);

    this.setState({ inputList:inputList});
  }

  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    const inputList = Object.assign([],this.state.inputList);
    inputList[index] = arrayobj;
    this.setState({inputList:inputList}); 
  }

  render() {
    return( 
      <div>
        <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
        { (this.state.open === true)   &&
          <div>
            <SideBar 
              open= "true"
              inputList={this.state.inputList}
              countField={this.countField}
              handleDrawerClose={this.handleDrawerClose}
              deleteInput={this.deleteInput}
              changeInput={this.changeInput}
              handleClickNewButton={this.handleClickNewButton}
              handleKeyPressEnter={this.handleKeyPressEnter}
            />
          </div>
        }
        <CanvasContainer inputList = {this.state.inputList} open={this.state.open}/>
      </div> 
    );
  }
}

export default Root;