import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';

var ctx; 
var scope = {};

class Root extends Component {
  constructor(){
    super();
    this.canvasRefs = {};
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      countField: 1, 
      inputList : [],
      expArr : [],
      // oprArr : ['+','-','*','/','%'],
      expVariables : [],
      words : [],
      storyCardObj : [],
    };
    
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleInputExpression = this.handleInputExpression.bind(this);
    this.loadCanvasWithRef = this.loadCanvasWithRef.bind(this);
    this.handleExpression = this.handleExpression.bind(this);
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
                // console.log("Array After updation is : ", this.state.inputList);
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
      
      try {
        return math.eval(inputExp,scope);
      }
      catch(e)
      {
        return "undefined";
      }
  }

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
      {
        var patternTypeVar = /[a-z]\=\d+/i;
        this.state.storyCardObj.map((item,index) =>{
          for( var i = index; i< (index + 1); i++){
              ctx = canvas[i].getContext('2d');
              ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);
              ctx.font = "normal 15px sans-serif";
              ctx.textAlign='center';
              if(patternTypeVar.test(item.expInput) === false) {
                ctx.fillText(item.expValue, (canvas[i].width)/2,(canvas[i].height)/2);
              }
              else {
                ctx.fillText(scope[item.expVariable], (canvas[i].width)/2,(canvas[i].height)/2);
              }
          }
        })
      }
  }

  loadCanvasWithRef(reference,index) { 
  
    console.log("ref",reference);
    const canvas = ReactDOM.findDOMNode(reference);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(this.state.words[0]) {
      var result = this.handleInputExpression(this.state.inputList[index].inputValue);
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign='center';
      ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
    }
    else {
      var result = this.state.storyCardObj.expValue;
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign='center';
      ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
    }
  }

  deleteInput(index,e){
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1.splice(index,1);
    this.setState({inputList:inputList1},
      () => {
        const storyCardObjArraytemp= Object.assign([],this.state.storyCardObj);
        storyCardObjArraytemp.splice(index,1);
        this.setState({storyCardObj:storyCardObjArraytemp},
            () => {
                 this.loadCanvas();}
          );
      }
    );
  }

  initstoryCardObj() {
    this.setState(
      {
        storyCardObj :  [...this.state.storyCardObj,
                        {
                          inputListIndex : '',
                          expVariable : '',
                          expValue : '',
                          sliderMinValue: '',
                          sliderMaxValue : '',
                          sliderStep : '',
                          sliderStatus: '',
                          expInput : '',
                         }
                        ]
      },
    );
  }

  handleExpression(inputExp,index) {
    var patternTypeValueOnly = /\d+/;
    var patternTypeVariableWithValue = /[a-z]\=\d+/i;
    
    if(patternTypeVariableWithValue.test(inputExp)) {
        this.initstoryCardObj();
        this.state.words = inputExp.split('=');
        var result = this.handleInputExpression(this.state.inputList[index].inputValue);

            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
            storyCardObjArraytemp.inputListIndex = index;
            storyCardObjArraytemp.expVariable = this.state.words[0];
            storyCardObjArraytemp.expValue = scope[this.state.words[0]];
            storyCardObjArraytemp.sliderStatus = true;
            storyCardObjArraytemp.expInput = inputExp;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[index] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () =>{
                this.loadCanvas();
              }
            );
    }

    else if(patternTypeValueOnly.test(inputExp)) {
        this.initstoryCardObj();
            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
            storyCardObjArraytemp.inputListIndex = index;
            storyCardObjArraytemp.expVariable = null;
            storyCardObjArraytemp.expValue = inputExp;
            storyCardObjArraytemp.sliderStatus = false;
            storyCardObjArraytemp.expInput = inputExp;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[index] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () =>{
                this.loadCanvas();
              }
            );
    }

    else {
      console.log("next step");
    }
  }

  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1[index] = arrayobj;
    this.setState({inputList:inputList1},
      () => {
        this.handleExpression(this.state.inputList[index].inputValue,index);
      });
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
              handleDrawerClose={this.handleDrawerClose}
              deleteInput={this.deleteInput}
              changeInput={this.changeInput}
              handleClickNewButton={this.handleClickNewButton}
              handleKeyPressEnter={this.handleKeyPressEnter}
            />
          </div>
        }
        <CanvasContainer 
          open={this.state.open} 
          scope = {scope}
          storyCardObj = {this.state.storyCardObj}
        />
      </div> 
    );
  }
}

export default Root;