import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import MainContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import 'escape-latex';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { EXITED } from 'react-transition-group/Transition';
// import './Mathquill';
//import './mathquill.css';

var ctx; 
var canvas = document.getElementsByClassName('canvas-container');
var numericalExpression = /^[(]?[+-]?[0-9]+[)]?(?:[+-/*^().]?[(]?[+-]?[0-9][)]?)*$/;
var MultiInputSingleOutputPattern = /[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;
var operators = /[-+/*()]/g;
var variables = /[a-z]+/;
var sliderMinVal = -10;
var sliderMaxVal = 10;

// var MQ = MathQuill.noConflict().getInterface(2);
addMathquillStyles();

class Root extends Component {
  constructor() {
    super();
    this.canvasRefs = {};
    uniqueId.enableUniqueIds(this);
    this.state = {
    open: false,
    sp : null,
    countField: 1, 
    inputList : [],
    words : [],
    storyCardObj : [],
    scope : {},
    prevIndex : 0,
    expCase : -1,
    status : null,
    changedinputList : null,
    result : null,
    expVariablesArray : null,
    latex : null,
    singleEntry : true,
    numericalExpressionArray : {},
    indexCounter : 0,
    latex: '',
    value : '',
  };

  this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  this.handleDrawerClose = this.handleDrawerClose.bind(this);
  this.handleClickNewButton = this.handleClickNewButton.bind(this);
  this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
  this.deleteInput = this.deleteInput.bind(this);
  this.changeInput = this.changeInput.bind(this);
  this.handleInputExpression = this.handleInputExpression.bind(this);
  this.loadCanvas = this.loadCanvas.bind(this);
  this.handleExpression = this.handleExpression.bind(this);
  this.updateScope = this.updateScope.bind(this);
  this.sliderIntervalOnClick = this.sliderIntervalOnClick.bind(this);
  this.onKeyPressSliderInterval = this.onKeyPressSliderInterval.bind(this);
  this.changeSliderMaxValue = this.changeSliderMaxValue.bind(this);
  this.changeSliderMinValue = this.changeSliderMinValue.bind(this);
  this.handleSwitchCases = this.handleSwitchCases.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false }); 
  };

  loadCanvas(storyCardObject) {
    var patternTypeVar = /^[0-9]+$/i;
    storyCardObject.map((item,storyCardIndex) => {
      ctx = canvas[storyCardIndex].getContext('2d');
      ctx.clearRect(0, 0, canvas[storyCardIndex].width, canvas[storyCardIndex].height);
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign='center';
      if(patternTypeVar.test(item.expInput) === true) {
        ctx.fillText(item.expValue, (canvas[storyCardIndex].width)/2,(canvas[storyCardIndex].height)/2);
      }
      else {
       ctx.fillText(item.expValue, (canvas[storyCardIndex].width)/2,(canvas[storyCardIndex].height)/2);
      }
    })
  }

  handlingNumericalExpression(inputExp,storyCardIndex,numericalExpressionIndex,id) {
    this.initstoryCardObj();
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
    storyCardObjArraytemp.inputListId = id;
    storyCardObjArraytemp.expVariable = null;
    storyCardObjArraytemp.expValue = this.handleInputExpression(inputExp);
    storyCardObjArraytemp.sliderStatus = false;
    storyCardObjArraytemp.expInput = inputExp;
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      const numericalExpressionArrayTemp = Object.assign({},this.state.numericalExpressionArray[numericalExpressionIndex]);
      numericalExpressionArrayTemp.inputListId = id;
      numericalExpressionArrayTemp.numericalExpression = this.handleInputExpression(inputExp);
      const numericalExpressionObjTemp = Object.assign([],this.state.numericalExpressionArray);
      numericalExpressionObjTemp[numericalExpressionIndex] = numericalExpressionArrayTemp;
      this.setState({numericalExpressionArray : numericalExpressionObjTemp},
      () => {
        this.loadCanvas(this.state.storyCardObj);
      });
    });
  }

  handlingVariableAssignedNumericalExpression(inputExp,storyCardIndex,variable,SliderStatus,id) {
    this.state.scope[variable] = this.handleInputExpression(inputExp); 
    this.initstoryCardObj();
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
    storyCardObjArraytemp.inputListId = id;
    storyCardObjArraytemp.expVariable = variable;
    storyCardObjArraytemp.expValue = this.state.scope[variable];
    storyCardObjArraytemp.expInput = inputExp;
    if(SliderStatus === false) {
      storyCardObjArraytemp.sliderStatus = false;
    }
    else {
      storyCardObjArraytemp.sliderStatus = true;
      if(this.state.scope[this.state.words[0]] > '10') {
        sliderMaxVal = this.state.scope[variable] ;
      }
      if(this.state.scope[this.state.words[0]] < '-10') {
        sliderMinVal = this.state.scope[variable];
      }
      storyCardObjArraytemp.sliderMinValue = sliderMinVal;
      storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
    }
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      this.loadCanvas(this.state.storyCardObj);
    }
    );
  }

  handlingMultiInputSingleOutputFunction(inputExp,id) {
  var SliderStatus = true;
  if(MultiInputSingleOutputPattern.test(this.state.words[1])) {
    var re = /\+|\-|\*|\/|\%|\./;
    var sp = this.state.words[1].split(re);
    if(sp != null) {
      sp.filter((variable) => {
        if(variables.test(variable)){
          if(this.state.scope[variable] === undefined) {
            this.initstoryCardObj();
            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
            storyCardObjArraytemp.inputListId = id;
            storyCardObjArraytemp.expVariable = variable;
            this.state.scope[variable] = 0; 
            storyCardObjArraytemp.expValue = this.state.scope[variable];
            storyCardObjArraytemp.expInput = inputExp;
            storyCardObjArraytemp.sliderStatus = true;
            storyCardObjArraytemp.sliderMinValue = sliderMinVal;
            storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
            () => {
              this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
              SliderStatus = false;
              this.handlingVariableAssignedNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.words[0],SliderStatus,id);
            }
            );
          }
          else {
            this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
            SliderStatus = false;
            this.handlingVariableAssignedNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.words[0],SliderStatus,id);
          }
        }
        else {
          this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
          this.state.storyCardObj.filter((item,storyCardIndex) => {
          if(item.expVariable === this.state.words[0]) {
            SliderStatus = false;
            this.handlingVariableAssignedNumericalExpression(inputExp,storyCardIndex,this.state.words[0],SliderStatus,id);
          }
          })
        }
        });
      }
    }
  }

  handleSwitchCases(Cases,inputExp,id) {

  switch (Cases) {
    case 0:
          if(this.state.numericalExpressionArray.length !== undefined) {
            this.state.numericalExpressionArray.filter((item) => {
              if(item.inputListId !== id) {
              this.handlingNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.numericalExpressionArray.length,id);
              }
            })
            this.state.numericalExpressionArray.filter((item,numericalExpressionArrayIndex) => {
              if(item.inputListId === id) {
                this.state.storyCardObj.filter((items,storyCardIndex) => {
                  if(items.inputListId === item.inputListId) {
                    this.handlingNumericalExpression(inputExp,storyCardIndex,numericalExpressionArrayIndex,id);
                  }
                })
              }
            })
          }
          else {
            this.handlingNumericalExpression(inputExp,this.state.storyCardObj.length,0,id);
          }
          break;

    case 1:
          if(this.state.scope[inputExp] === undefined) {
            this.initstoryCardObj();
            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
            storyCardObjArraytemp.inputListId = id;
            storyCardObjArraytemp.expVariable = inputExp;
            this.state.scope[inputExp] = 0; 
            storyCardObjArraytemp.expValue = this.state.scope[inputExp];
            storyCardObjArraytemp.expInput = inputExp;
            storyCardObjArraytemp.sliderStatus = true;
            storyCardObjArraytemp.sliderMinValue = sliderMinVal;
            storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
            () => {
              this.loadCanvas(this.state.storyCardObj);
            });
          }
          break;

    case 2:
          var SliderStatus = true;
          this.state.words = inputExp.split('=');
          if(this.state.scope[this.state.words[0]] === undefined) {
            this.handlingVariableAssignedNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.words[0],SliderStatus,id);
          }
          else { 
            if(numericalExpression.test(this.state.words[1])) {
              this.state.storyCardObj.filter((item,storyCardIndex) => {
              if(this.state.words[0] === item.expVariable) {
                if(operators.test(this.state.words[1])) {
                  SliderStatus = false;
                }
                this.handlingVariableAssignedNumericalExpression(inputExp,storyCardIndex,this.state.words[0],SliderStatus,id);
              }
              });
            }
          }
          break; 

    case 3:
          this.state.words = inputExp.split('=');
          if(this.state.scope[this.state.words[0]] === undefined) {
            this.handlingMultiInputSingleOutputFunction(inputExp,id);
          }
          else {
            this.handlingMultiInputSingleOutputFunction(inputExp,id);
          }
          break;

    default :
          alert("error in the expression");
          break;
    }
  }

  handleClickNewButton(e) {
    this.setState(
    { countField: this.state.countField + 1 ,
      inputList:[...this.state.inputList,
          {id:this.nextUniqueId,inputValue: '',inputValueId: this.state.indexCounter}]
    },
    () => {
      var index = this.state.indexCounter +1;
      this.setState({indexCounter : index})
    });
  };

  handleKeyPressEnter = event => {
    if (event.key === 'Enter') {
      this.handleClickNewButton(event);
    }
  };

  handleInputExpression(inputExp) {
    if(inputExp === '') {
      return inputExp;
    }
    try {
      return math.eval(inputExp,this.state.scope);
    }
    catch(e) {
      return "undefined";
    }
  }

  updateStorycard(storyCardIndex,variable) {
    this.initstoryCardObj();
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
    storyCardObjArraytemp.expValue = this.state.scope[variable];
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () => {
      this.loadCanvas(this.state.storyCardObj);
    });
  }

  updateScope(sliderVariable,sliderValue) {
    const scopeTemp = Object.assign({},this.state.scope);
    scopeTemp[sliderVariable] = sliderValue;
    this.setState({scope:scopeTemp},
    () =>{
      this.state.storyCardObj.filter((items,storyCardIndex) => {
        if(sliderVariable === items.expVariable) {
          this.updateStorycard(storyCardIndex,sliderVariable);
        }
      })
      this.state.storyCardObj.filter((items,storyCardIndex) => {
        if(items.expInput.length >= 3) {
          this.state.words = items.expInput.split('=');
          var re = /\+|\-|\*|\/|\%/;
          var sp = this.state.words[1].split(re);
          if(sp != null) {
            sp.filter((h) => {
              if(h === sliderVariable) {
                const scopeTemp = Object.assign({},this.state.scope);
                scopeTemp[this.state.words[0]] = this.handleInputExpression(items.expInput);
                this.setState({scope:scopeTemp},
                () => {
                  this.loadCanvas(this.state.storyCardObj);
                  this.updateStorycard(storyCardIndex,this.state.words[0]);
                });
              }
            })
          }
        }
      })
    }
    );
  }

 deleteInput(index,e,id) {
    var duplicateObject = JSON.parse(JSON.stringify( this.state.storyCardObj ));
    const inputListTemp = Object.assign([],this.state.inputList);
    inputListTemp.splice(index,1);
    this.setState({inputList : inputListTemp},
    () => {
      const tempdel = (duplicateObject.filter(item => item.inputListId === index));
      duplicateObject.map((item,storyCardIndex) => {
        if(item.inputListId === index) {
          if(item.expVariable !== null) {
            duplicateObject.splice(storyCardIndex,1);
            for(var i = 2;i <= tempdel.length ;i++) {
              duplicateObject.map((item,storyCardIndex) => {
                if(item.inputListId === index) {
                  duplicateObject.splice(storyCardIndex,1);
                }
              });
            }
            delete this.state.scope[item.expVariable];
          }
          else {
            duplicateObject.splice(storyCardIndex,1);
          }
        }
     
      })
      duplicateObject.map((item,indexs) => {
        if(item.inputListId >= index) {
          const storyCardObjtemp= Object.assign({},duplicateObject[indexs]);
          storyCardObjtemp.inputListId =  item.inputListId-1;
          duplicateObject[indexs] = storyCardObjtemp;
        }
      });
      this.setState({storyCardObj : duplicateObject},
        () => {
          this.loadCanvas(this.state.storyCardObj);
        });
    })
 }

  sliderIntervalOnClick(index,sliderMinOrMax) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderStatus = sliderMinOrMax;
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      // console.log(this.state.storyCardObj)
      this.loadCanvas(this.state.storyCardObj);
    });
  }
 
  onKeyPressSliderInterval(index,e,val) {
    if (e.key == 'Enter') {
      const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
      if(storyCardObjArraytemp.sliderMinValue >= val && storyCardObjArraytemp.sliderMaxValue == val) {
        alert('Enter a valid value');
      }
      else if(storyCardObjArraytemp.sliderMaxValue < val && storyCardObjArraytemp.sliderMinValue == val) {
        alert('Enter a valid value');
      }
      else {
        if(storyCardObjArraytemp.sliderMinValue > storyCardObjArraytemp.expValue) {
          alert('Input value is not within the range provided');
          return; 
        }
        if(storyCardObjArraytemp.sliderMaxValue < storyCardObjArraytemp.expValue) {
          alert('Input value is not within the range provided');
          return;
        }
        storyCardObjArraytemp.sliderStatus = true;
        const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
        storyCardObjtemp[index] = storyCardObjArraytemp;
        this.setState({storyCardObj:storyCardObjtemp},
        () =>{
          // console.log(this.state.storyCardObj)
          this.loadCanvas(this.state.storyCardObj);
        });
      }
    }
  }
 
  changeSliderMaxValue(index,e) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderMaxValue = parseInt(e.target.value);
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      // console.log(this.state.storyCardObj)
      this.loadCanvas(this.state.storyCardObj);
    });
  }
 
  changeSliderMinValue(index,e) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderMinValue = parseInt(e.target.value);
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      // console.log(this.state.storyCardObj)
      this.loadCanvas(this.state.storyCardObj);
    });
  }
 
  initstoryCardObj() {
    this.setState({
      storyCardObj : [...this.state.storyCardObj,
      {
        inputListId : '',
        expVariable : '',
        expValue : '',
        sliderMinValue: '',
        sliderMaxValue : '',
        sliderStep : '',
        sliderStatus: '',
        expInput : '',
        expInputType: '',
        }
      ]
    });
  }
 
  handleExpression(inputExp,index,id) {
    var variablesOnly = /^[a-z]+$/;
    var numericalExpression = /^[(]?[+-]?[0-9]+[)]?(?:[+-/*^()]?[(]?[+-]?[0-9][)]?)*$/;
    var VariableAssignedNumericalExpression = /\=[(]?[+-]?[0-9]+[)]?(?:[+-/*^()]?[(]?[+-]?[0-9][)]?)*$/g;
    var MultiInputSingleOutputFunction =/\=[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;

    if(numericalExpression.test(inputExp)) { 
      this.setState({expCase : 0},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
    }
    
    else if(variablesOnly.test(inputExp)) {
      this.setState({expCase : 1},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
    }

    else if(VariableAssignedNumericalExpression.test(inputExp)) {
      this.setState({expCase : 2},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
    }
    
    else if(MultiInputSingleOutputFunction.test(inputExp)) {
      this.setState({expCase : 3},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
      }
      console.log("expCase",this.state.expCase);
  }
 
  changeInput(index,e,id) {
    if (e.key === 'Enter') {
      this.handleClickNewButton(e);
    }
    var noCanvasc = /\=$/;

    if(noCanvasc.test(e.target.value) || e.target.value === '') {
      this.state.storyCardObj.map((item,storyCardIndex) => {
        if(item.inputListId === index ) {
          if(item.expVariable !== null) {
            this.state.storyCardObj.splice(storyCardIndex,1);
            delete this.state.scope[item.expVariable];
          }
          else {
            this.state.storyCardObj.splice(storyCardIndex,1);
          }
        }
      });
      this.loadCanvas(this.state.storyCardObj);
  }

  const arrayobj= Object.assign({},this.state.inputList[index]);
  arrayobj.inputValue = e.target.value;
  const inputList1 = Object.assign([],this.state.inputList);
  inputList1[index] = arrayobj;
  this.setState({inputList:inputList1},
  () => {
    this.handleExpression(this.state.inputList[index].inputValue,index,id);
    this.setState({changedinputList:true});
  });
  }
 
 
 render() {
  return( 
    <div>
    <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
      { (this.state.open === true) &&
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
      <MainContainer 
      open={this.state.open} 
      scope = {this.state.scope}
      storyCardObj = {this.state.storyCardObj}
      loadCanvas = {this.loadCanvas}
      updateScope = {this.updateScope}
      changeSliderMaxValue = {this.changeSliderMaxValue}
      changeSliderMinValue = {this.changeSliderMinValue}
      status = {this.state.status}
      expResult = {this.state.result}
      onKeyPressSliderInterval ={this.onKeyPressSliderInterval}
      changedinputList = {this.state.changedinputList}
      sliderIntervalOnClick = {this.sliderIntervalOnClick}
      />
    </div> 
  );
  }
}
 
export default Root;