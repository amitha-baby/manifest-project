import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';

var ctx;
var scope ={};

class Root extends Component {
  constructor(){
    super();
    this.canvasRefs = {};
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      countField: 1, 
      inputList : []
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleInputExpression = this.handleInputExpression.bind(this);
    this.getCanvasRef = this.getCanvasRef.bind(this);
    this.getSliderRef = this.getSliderRef.bind(this);
    this.loadCanvasWithRef = this.loadCanvasWithRef.bind(this);
    // this.editCanvas = this.editCanvas.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });  
  };

  handleClickNewButton(e) {
    this.setState(
      { countField: this.state.countField + 1 ,
        inputList:[...this.state.inputList,
          {id:this.nextUniqueId,inputValue: ''}
        ]  
      },
        () => {
                // this.refs.inputValue.focus();
                // document.getElementById("text-field").focus();
                // console.log(this.state.inputList[0].id());
                console.log("Array After updation is : ", this.state.inputList);
                // this.loadCanvas();
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
  }

  expValueHoldingVariable(inputExp) {
    var pattern = new RegExp("[a-z]+");
    var exp = pattern.exec(inputExp);
    console.log("scope",scope.a);
  }


  ////////////////////////////////////////////////////////////////////
  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      this.state.inputList.map((item,index) =>{
        for( var i = index; i< (index + 1); i++){
            
            ctx = canvas[i].getContext('2d');
            
            ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);

            var result = this.handleInputExpression(item.inputValue);
            ctx.font = "normal 15px sans-serif";
            ctx.textAlign='center';
            ctx.fillText(result, (canvas[i].width)/2,(canvas[i].height)/2);
            this.expValueHoldingVariable(item.inputValue);
        }
      })
    }
  }
  ///////////////////////////////////////////////////////////////////////


  getCanvasRef(reference) {
    this.canvasRefs = reference;
  }

  getSliderRef(reference) {
    this.sliderRefs = reference;
  }
 
  loadCanvasWithRef(reference,index) { 
    const canvas = ReactDOM.findDOMNode(reference);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var result = this.handleInputExpression(this.state.inputList[index].inputValue);
    ctx.font = "normal 15px sans-serif";
    ctx.textAlign='center';
    ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);

  }

  deleteInput(index,e){
    // ReactDOM.unmountComponentAtNode(this.canvasRefs['canvas'+index]);

    const inputList1 = Object.assign([],this.state.inputList);
    // this.canvasRefs['canvas'+index] =null;
    // delete this.canvasRefs['canvas'+index];

    inputList1.splice(index,1);
    this.setState({inputList:inputList1},
      () => {
        // this.canvasRefs['canvas'+index] =null;
          //  console.log("inputList",this.state.inputList);
           this.loadCanvas();
          // ReactDOM.unmountComponentAtNode(this.canvasRefs['canvas'+index]);

      }
    );
  }

  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1[index] = arrayobj;
    this.setState({inputList:inputList1},
      () => {
        console.log("this.canvasRefs['canvas'+index]",this.canvasRefs['canvas'+index]);
        this.loadCanvasWithRef(this.canvasRefs['canvas'+index],index);
      });
  }

  // editCanvas(index,value) {
  //   const canvas = ReactDOM.findDOMNode(this.canvasRefs['canvas'+index]);
  //   const ctx = canvas.getContext('2d');
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   var result = this.handleInputExpression(value);
  //   ctx.font = "normal 15px sans-serif";
  //   ctx.textAlign='center';
  //   ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);

  // }


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
        <CanvasContainer 
          inputList = {this.state.inputList} 
          open={this.state.open} 
          editCanvas={this.editCanvas}
          getSliderRef = {this.getSliderRef}
          getCanvasRef={this.getCanvasRef}
          canvasRefs={this.canvasRefs} 
          scope={this.scope}
        />
         
        
      </div> 
    );
  }
}

export default Root;