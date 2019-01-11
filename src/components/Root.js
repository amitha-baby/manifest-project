import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import MainContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';

var ctx; 

addMathquillStyles();

class Root extends Component {
  constructor(){
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

  loadCanvas() {
    var canvas = document.getElementsByClassName('canvas-container');
    var patternTypeVar = /[a-z]\=[\+|\-]?\d+/i;
    this.state.storyCardObj.map((item,storyCardIndex) => {
      ctx = canvas[storyCardIndex].getContext('2d');
      ctx.clearRect(0, 0, canvas[storyCardIndex].width, canvas[storyCardIndex].height);
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign='center';
      if(patternTypeVar.test(item.expInput) === false) {
        ctx.fillText(item.expValue, (canvas[storyCardIndex].width)/2,(canvas[storyCardIndex].height)/2);
      }
      else {
        ctx.fillText(this.state.scope[item.expVariable], (canvas[storyCardIndex].width)/2,(canvas[storyCardIndex].height)/2);
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
              console.log("numericalExpressionArray",this.state.numericalExpressionArray);
              console.log("inputlist",this.state.inputList);
              console.log("stroycard",this.state.storyCardObj);
              this.loadCanvas();
            });
      });
  }

  handlingVariableAssignedNumericalExpression(inputExp,storyCardIndex,variable,SliderStatus,id) {
    var sliderMinVal = -10;
    var sliderMaxVal = 10;
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
        console.log("scope",this.state.scope);
        console.log("inputlist",this.state.inputList);
        console.log("stroycard",this.state.storyCardObj);
        this.loadCanvas();
      }
    );
  }

  handlingMultiInputSingleOutputFunction(inputExp,id,variable,index) {
    var SliderStatus = false;
    this.handlingVariableAssignedNumericalExpression(inputExp,index,variable,SliderStatus,id);
  }

  handleSwitchCases(Cases,inputExp,index,id) {
    var sliderMinVal = -10;
    var sliderMaxVal = 10;
    var numericalExpression  = /^[(]?[+-]?[0-9]+[)]?(?:[+-/*^().]?[(]?[+-]?[0-9][)]?)*$/;
    var MultiInputSingleOutputPattern = /[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;
    var operators = /[-+/*()]/g;
    var variables = /[a-z]+/;

    switch (Cases) {
      case 0:
            if(this.state.numericalExpressionArray.length !== undefined) {
              this.state.numericalExpressionArray.filter((item) => {
                if(item.inputListId !== id) {
                  console.log(" not 1st digit");
                  this.handlingNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.numericalExpressionArray.length,id);
                }
              })
              this.state.numericalExpressionArray.filter((item,numericalExpressionArrayIndex) => {
                if(item.inputListId === id) {
                console.log("other digit");
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

      case 2:
            this.state.words = inputExp.split('=');
            if(this.state.scope[this.state.words[0]] === undefined) {
              if(MultiInputSingleOutputPattern.test(this.state.words[1])) {
                    var re = /\+|\-|\*|\/|\%|\./;
                    var sp = this.state.words[1].split(re);
                      if(sp != null) {
                        sp.filter((h) => {
                          if(variables.test(h)){
                            if(this.state.scope[h] === undefined) {
                            this.initstoryCardObj();
                            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                            storyCardObjArraytemp.inputListId = id;
                            storyCardObjArraytemp.expVariable = h;
                            this.state.scope[h] = 0; 
                            storyCardObjArraytemp.expValue = this.state.scope[h];
                            storyCardObjArraytemp.expInput = inputExp;
                            storyCardObjArraytemp.sliderStatus = true;
                            storyCardObjArraytemp.sliderMinValue = sliderMinVal;
                            storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
                            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                            storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
                            this.setState({storyCardObj:storyCardObjtemp},
                              () => {
                                this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
                                this.handlingMultiInputSingleOutputFunction(inputExp,id,this.state.words[0],this.state.storyCardObj.length);
                              }
                            );
                          }
                          else {
                            this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
                            this.handlingMultiInputSingleOutputFunction(inputExp,id,this.state.words[0],this.state.storyCardObj.length);
                          }
                        }
                        });
                      }
              }
            }
            else {
              if(MultiInputSingleOutputPattern.test(this.state.words[1])) {
                var re = /\+|\-|\*|\/|\%|\./;
                var sp = this.state.words[1].split(re);
                  if(sp != null) {
                    sp.filter((h) => {
                      if(variables.test(h)){
                        if(this.state.scope[h] === undefined) {
                        this.initstoryCardObj();
                        const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                        storyCardObjArraytemp.inputListId = id;
                        storyCardObjArraytemp.expVariable = h;
                        this.state.scope[h] = 0; 
                        storyCardObjArraytemp.expValue = this.state.scope[h];
                        storyCardObjArraytemp.expInput = inputExp;
                        storyCardObjArraytemp.sliderStatus = true;
                        storyCardObjArraytemp.sliderMinValue = sliderMinVal;
                        storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
                        const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                        storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
                        this.setState({storyCardObj:storyCardObjtemp},
                          () => {
                            this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
                            this.handlingMultiInputSingleOutputFunction(inputExp,id,this.state.words[0],this.state.storyCardObj.length);
                          }
                        );
                      }
                      else {
                        this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
                        this.handlingMultiInputSingleOutputFunction(inputExp,id,this.state.words[0],this.state.storyCardObj.length);
                      }
                    }
                    else {
                      this.state.scope[this.state.words[0]] = this.handleInputExpression(inputExp); 
                      this.state.storyCardObj.filter((item,storyCardIndex) => {
                        if(item.expVariable === this.state.words[0]) {
                          this.handlingMultiInputSingleOutputFunction(inputExp,id,this.state.words[0],storyCardIndex);
                        }
                      })
                    }
                  });
                }
              }
            }
          break;

      default :
          console.log("next step");
          break;
    }
  }

  handleClickNewButton(e) {
    this.setState(
      { countField: this.state.countField + 1 ,
        inputList:[...this.state.inputList,
          {id:this.nextUniqueId,inputValue: '',inputValueId: this.state.indexCounter}
        ]
      },
      () => {
        var index = this.state.indexCounter +1;
        this.setState({indexCounter : index})
      }
    );
  };

  handleKeyPressEnter = event => {
    if (event.key === 'Enter') {
    console.log("on key press")
      this.handleClickNewButton(event);
    }
  };

  handleInputExpression(inputExp) {
    if(inputExp === '')
    {
      return inputExp;
    }
    try {
      return math.eval(inputExp,this.state.scope);
    }
    catch(e)
    {
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
        this.loadCanvas();
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
                      this.loadCanvas();
                      this.updateStorycard(storyCardIndex,this.state.words[0]);
                    });
                }
              })
            }
        })
      }
    );
  }

  deleteInputFromStorycard(storyCardIndex) {
    const storyCardObjArraytemp= Object.assign([],this.state.storyCardObj);
    storyCardObjArraytemp.splice(storyCardIndex,1);
    this.setState({storyCardObj:storyCardObjArraytemp},
      () => {
          console.log("inputlist",this.state.inputList);
          console.log("stroycard",this.state.storyCardObj);
          this.loadCanvas();
      }
    );
  }

  deleteInput(index,e,id) {
    const inputListTemp = Object.assign([],this.state.inputList);
    inputListTemp.splice(index,1);
    console.log(this.state.inputList)
    this.setState({inputList:inputListTemp},
      () => {
        this.state.storyCardObj.filter((item,storyCardIndex) => {
          if(item.inputListId === id && item.expVariable === null) {
           this.deleteInputFromStorycard(storyCardIndex);
          }
          if(item.inputListId === id && item.expVariable !== null) {
            var scopeTemp = item.expVariable;
            this.deleteInputFromStorycard(storyCardIndex);
            delete this.state.scope[scopeTemp];
            console.log("scope",this.state.scope);
          }
        })
      }
    );
  }

  sliderIntervalOnClick(index,sliderMinOrMax) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderStatus = sliderMinOrMax;
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      console.log(this.state.storyCardObj)
      this.loadCanvas();
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
          console.log(this.state.storyCardObj)
          this.loadCanvas();
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
      console.log(this.state.storyCardObj)
      this.loadCanvas();
    });
  }
       
  changeSliderMinValue(index,e) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderMinValue = parseInt(e.target.value);
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
    () =>{
      console.log(this.state.storyCardObj)
      this.loadCanvas();
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
    var numericalExpression = /^[(]?[+-]?[0-9]+[)]?(?:[+-/*^()]?[(]?[+-]?[0-9][)]?)*$/;
    var VariableAssignedNumericalExpression = /[a-z]+\=[(]?[+-]?[0-9]+[)]?(?:[+-/*^()]?[(]?[+-]?[0-9][)]?)*$/g;
    var MultiInputSingleOutputFunction =/^[a-z]+(?:[(][a-z]+[)])?\=[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;
    
    if(numericalExpression.test(inputExp)) { 
      this.setState({expCase : 0},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
    }
    
    else if(VariableAssignedNumericalExpression.test(inputExp)) {
      this.setState({expCase : 1},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
    }
    
    else if(MultiInputSingleOutputFunction.test(inputExp)) {
      this.setState({expCase : 2},
      () => {
        this.handleSwitchCases(this.state.expCase,inputExp,index,id);
      });
      }
    }
    
  changeInput(index,e,id) {
    if(e.target.value === '') {
      const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
      storyCardObjArraytemp.expValue = '';
      const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
      storyCardObjtemp[index] = storyCardObjArraytemp;
      this.setState({storyCardObj:storyCardObjtemp},
      () =>{
        console.log(this.state.storyCardObj)
        this.loadCanvas();
      }
      );
    }
    if(this.state.storyCardObj.length > 0 ) {
      const arrayobj= Object.assign({},this.state.inputList[index]);
      arrayobj.inputValue = e.target.value;
      const inputList1 = Object.assign([],this.state.inputList);
      inputList1[index] = arrayobj;
      this.setState({inputList:inputList1},
      () => {
        console.log(this.state.inputList)
        this.setState({changedinputList:true});
        this.handleExpression(this.state.inputList[index].inputValue,index,id);
      });
    }
    else {
      const arrayobj= Object.assign({},this.state.inputList[index]);
      arrayobj.inputValue = e.target.value;
      const inputList1 = Object.assign([],this.state.inputList);
      inputList1[index] = arrayobj;
      this.setState({inputList:inputList1},
      () => {
        console.log(this.state.inputList)
        this.setState({singleEntry : false});
        this.setState({changedinputList:true});
        this.handleExpression(this.state.inputList[index].inputValue,index,id);
      });
    }
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