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
var firstEntry = 0;
var indexTemp = null;

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
    this.textfun = this.textfun.bind(this);
    this.changeSliderMinValue = this.changeSliderMinValue.bind(this);
    this.handleSwitchCases = this.handleSwitchCases.bind(this);
    this.updateExp = this.updateExp.bind(this);
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


  handleSwitchCases(Cases,inputExp,index) {
    var sliderMinVal = -10;
    var sliderMaxVal = 10;
    var numericalExpression  = /^[0-9]+[+-/*]?[0-9]*$/;
    var MultiInputSingleOutputPattern = /^\w+([+-/*]?\w+)+$/g;
    var operators = /[-+/*()]/g;
    var variables = /[a-z]+/;

    switch (Cases) {
      case 0:
            this.setState({result : this.handleInputExpression(this.state.inputList[index].inputValue)});
            if(firstEntry === 0) {
              firstEntry = 1;
              this.initstoryCardObj();
              indexTemp = this.state.storyCardObj.length;
            }
            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[indexTemp]);
            storyCardObjArraytemp.inputListIndex = index;
            storyCardObjArraytemp.expVariable = null;
            storyCardObjArraytemp.expValue = this.state.result;
            storyCardObjArraytemp.sliderStatus = false;
            storyCardObjArraytemp.expInput = inputExp;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[indexTemp] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () =>{
                if (document.getElementById('my-slider')) {
                  document.getElementById('my-slider').style.display = 'none';
                }
                this.loadCanvas();
              }
            );
          break;

      case 1:
            this.state.words = inputExp.split('=');
            if(this.state.scope[this.state.words[0]] === undefined) {
              this.initstoryCardObj();
              this.setState({result : this.handleInputExpression(this.state.inputList[index].inputValue)});
              const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
              storyCardObjArraytemp.inputListIndex = index;
              storyCardObjArraytemp.expVariable = this.state.words[0];
              storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
              storyCardObjArraytemp.expInput = inputExp;
              storyCardObjArraytemp.sliderStatus = true;
              storyCardObjArraytemp.sliderMinValue = sliderMinVal;
              storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
              const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
              storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
              this.setState({storyCardObj:storyCardObjtemp},
                () =>{
                  this.loadCanvas();
                }
              );
            }
            else {
              if(numericalExpression.test(this.state.words[1])) {
                this.setState({result : this.handleInputExpression(this.state.inputList[index].inputValue)});
                this.state.storyCardObj.map((item,storyCardIndex) => {
                  if(this.state.words[0] === item.expVariable) {
                    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
                    storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                    storyCardObjArraytemp.expVariable = this.state.words[0];
                    if(operators.test(this.state.words[1])) {
                      storyCardObjArraytemp.sliderStatus = false;
                    }
                    else {
                      storyCardObjArraytemp.sliderStatus = true;
                      if(this.state.scope[this.state.words[0]] > '10') {
                        sliderMaxVal = this.state.scope[this.state.words[0]] ;
                      }
                      if(this.state.scope[this.state.words[0]] < '-10') {
                        sliderMinVal = this.state.scope[this.state.words[0]];
                      }
                      storyCardObjArraytemp.sliderMinValue = sliderMinVal;
                      storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
                    }
                    this.state.inputList.value = storyCardObjArraytemp.expValue;
                    storyCardObjArraytemp.expInput = inputExp;  
                    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                    storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
                    this.setState({storyCardObj:storyCardObjtemp},
                      () =>{
                        this.loadCanvas();
                      }
                    );
                  }
                });
              }
            }
        break;      

      case 2:
            this.state.words = inputExp.split('=');
            if(this.state.scope[this.state.words[0]] === undefined) {
              if(MultiInputSingleOutputPattern.test(this.state.words[1])) {
                    var re = /\+|\-|\*|\/|\%/;
                    var sp = this.state.words[1].split(re);
                      if(sp != null) {
                        sp.map((h) => {
                          if(variables.test(h)){
                            if(this.state.scope[h] === undefined) {
                            this.initstoryCardObj();
                            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                            storyCardObjArraytemp.inputListIndex = index;
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
                                this.loadCanvas();
                                this.initstoryCardObj();
                                this.state.scope[this.state.words[0]] = this.handleInputExpression(this.state.inputList[index].inputValue); 
                                const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                                storyCardObjArraytemp.inputListIndex = index;
                                storyCardObjArraytemp.expVariable = this.state.words[0];
                                storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                                storyCardObjArraytemp.expInput = inputExp;
                                storyCardObjArraytemp.sliderStatus = false;
                                const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                                storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
                                this.setState({storyCardObj:storyCardObjtemp},
                                  () => {
                                    this.loadCanvas();
                                  }
                                );
                              }
                            );
                          }
                          else {
                            this.initstoryCardObj();
                            this.state.scope[this.state.words[0]] = this.handleInputExpression(this.state.inputList[index].inputValue); 
                            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                            storyCardObjArraytemp.inputListIndex = index;
                            storyCardObjArraytemp.expVariable = this.state.words[0];
                            storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                            storyCardObjArraytemp.expInput = inputExp;
                            storyCardObjArraytemp.sliderStatus = false;
                            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                            storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
                            this.setState({storyCardObj:storyCardObjtemp},
                              () =>{
                                this.loadCanvas();
                              }
                            );
                          }
                        }
                        });
                      }
              }
            }
            else {
              if(MultiInputSingleOutputPattern.test(this.state.words[1])) {
                var re = /\+|\-|\*|\/|\%/;
                var sp = this.state.words[1].split(re);
                  if(sp != null) {
                    sp.map((h) => {
                      if(variables.test(h)){
                        if(this.state.scope[h] === undefined) {
                        this.initstoryCardObj();
                        const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
                        this.state.scope[this.state.words[0]] = this.handleInputExpression(this.state.inputList[index].inputValue); 
                        storyCardObjArraytemp.inputListIndex = index;
                        storyCardObjArraytemp.expVariable = this.state.words[0];
                        // this.state.scope[h] = 0; 
                        storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                        storyCardObjArraytemp.expInput = inputExp;
                        storyCardObjArraytemp.sliderStatus = true;
                        storyCardObjArraytemp.sliderMinValue = sliderMinVal;
                        storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
                        const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                        storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
                        this.setState({storyCardObj:storyCardObjtemp},
                          () => {
                            this.loadCanvas();
                          }
                        );
                      }
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
          {id:this.nextUniqueId,inputValue: ''}
        ]
      },
        () => {
        firstEntry = 0; 
        })
  };

  handleKeyPressEnter = event => {
    if (event.key === 'Enter') {
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

  updateExp(sliderVariable) {

}

  updateScope(sliderVariable,sliderValue) {
    const scopeTemp = Object.assign({},this.state.scope);
    scopeTemp[sliderVariable] = sliderValue;
    this.setState({scope:scopeTemp},
      () =>{
        this.state.storyCardObj.map((items,storyCardIndex) => {
          if(sliderVariable === items.expVariable) {
            this.initstoryCardObj();
            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
            storyCardObjArraytemp.expValue = this.state.scope[sliderVariable];
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () => {
                this.state.storyCardObj.map((items,storyCardIndex) => {
                  this.state.words = items.expInput.split('=');
                  var re = /\+|\-|\*|\/|\%/;
                  var sp = this.state.words[1].split(re);
                  if(sp != null) {
                    sp.map((h) => {
                      if(h === sliderVariable) {
                        const scopeTemp = Object.assign({},this.state.scope);
                        scopeTemp[this.state.words[0]] = this.handleInputExpression(items.expInput);
                        this.setState({scope:scopeTemp},
                          () => {
                            this.loadCanvas();
                            this.initstoryCardObj();
                            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
                            storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                            storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
                            this.setState({storyCardObj:storyCardObjtemp},
                            () => {
                              console.log("storycard",items.expInput,this.state.storyCardObj)
                              this.loadCanvas();
                            });
                          });
                      }
                    })
                  }
                })
              });
          }

        })
        
      }
    );
  }

 
  loadCanvasWithRef(reference,index) { 
  }

  deleteInput(index,e){
    const inputListTemp = Object.assign([],this.state.inputList);
    inputListTemp.splice(index,1);
    this.setState({inputList:inputListTemp},
      () => {
        if(this.state.storyCardObj[index] !== undefined) {
          var scopeTemp = this.state.storyCardObj[index].expVariable;
          const storyCardObjArraytemp= Object.assign([],this.state.storyCardObj);
          storyCardObjArraytemp.splice(index,1);
          this.setState({storyCardObj:storyCardObjArraytemp},
              () => {
                  delete this.state.scope[scopeTemp];
                  this.loadCanvas();}
            );
        }
        else {
          this.loadCanvas();
        }
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
      }
    );
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
          }
        );
      }
    }
  }

  changeSliderMaxValue(index,e) {
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
    storyCardObjArraytemp.sliderMaxValue =  parseInt(e.target.value);
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
      () =>{
        console.log(this.state.storyCardObj)
        this.loadCanvas();
      }
    );
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
                          expInputType: '',
                         }
                        ]
      },
    );
  }

  handleExpression(inputExp,index) {
    var numericalExpression  = /^[0-9]+[+-/*^]?[0-9]*$/;
    var VariableAssignedNumericalExpression  = /[a-z]+\=[0-9]+([+-/*]?[0-9]*)+$/g;
    var MultiInputSingleOutputFunction = /^[a-z]\=\w+([+-/*]?\w+)+$/g;
    
    if(numericalExpression.test(inputExp)) { 
      this.setState({expCase : 0},
        () => {
          this.handleSwitchCases(this.state.expCase,inputExp,index);
        });
    }

    else if(VariableAssignedNumericalExpression.test(inputExp)) {
      this.setState({expCase : 1},
      () => {
        // alert(this.state.expCase)
        this.handleSwitchCases(this.state.expCase,inputExp,index);
      });
    }
     
    else if(MultiInputSingleOutputFunction.test(inputExp)) {
      this.setState({expCase : 2},
        () => {
          // alert(this.state.expCase)
          this.handleSwitchCases(this.state.expCase,inputExp,index);
        });
    }
  }

  textfun() {
  }

  changeInput(index,e) {
    if(this.state.storyCardObj.length > 0 ) {
      this.state.storyCardObj.map((item) => {
        if(e.target.value !== item.expVariable) {
          console.log("eee")
          const arrayobj= Object.assign({},this.state.inputList[index]);
          arrayobj.inputValue = e.target.value;
          const inputList1 = Object.assign([],this.state.inputList);
          inputList1[index] = arrayobj;
          this.setState({inputList:inputList1},
            () => {
              this.setState({changedinputList:true});
              this.handleExpression(this.state.inputList[index].inputValue,index);
          });
        }
        else {
          alert("Variable already defined");
          console.log("ppp")
          return;
        }
      }); 
    }
    else {
      console.log("wwww")
      const arrayobj= Object.assign({},this.state.inputList[index]);
      arrayobj.inputValue = e.target.value;
      const inputList1 = Object.assign([],this.state.inputList);
      inputList1[index] = arrayobj;
      this.setState({inputList:inputList1},
        () => {
          this.setState({singleEntry : false});
          this.setState({changedinputList:true});
          this.handleExpression(this.state.inputList[index].inputValue,index);
      });
    }
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
            textfun = {this.textfun}
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