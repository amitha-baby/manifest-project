import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import MainContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { EXITED } from 'react-transition-group/Transition';

var ctx; 
var sliderMinVal = -10;
var sliderMaxVal = 10;
var operators = /[-+/*()]/g;
var variables = /[a-z]+/;
var numericalExpression  = /^[(]?[+-]?[0-9]+[)]?(?:[+-/*^().]?[(]?[+-]?[0-9][)]?)*$/;
var MultiInputSingleOutputFunction =/^[a-z]+(?:[(][a-z]+[)])?\=[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;
var MultiInputSingleOutputPattern = /[(]?\w+[)]?(?:[+-/*^.]?[(]?\w+[)]?)*$/g;
var VariableAssignedNumericalExpression = /[a-z]+\=[(]?[+-]?[0-9]+[)]?(?:[+-/*^()]?[(]?[+-]?[0-9][)]?)*$/g;

addMathquillStyles();

class Root extends Component {
  constructor(){
    super();
    this.canvasRefs = {};
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      sp : null,
      inputList : [],
      words : [],
      storyCardObj : [],
      scope : {},
      expCase : -1,
      changedinputList : null,
      expVariablesArray : null,
      latex : null,
      singleEntry : true,
      numericalExpressionArray : {},
      indexCounter : 0,
    };
    
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.loadCanvas = this.loadCanvas.bind(this);
    this.handleClickNewButton = this.handleClickNewButton.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
    this.handleInputExpression = this.handleInputExpression.bind(this);
    this.updateScope = this.updateScope.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.sliderIntervalOnClick = this.sliderIntervalOnClick.bind(this);
    this.onKeyPressSliderInterval = this.onKeyPressSliderInterval.bind(this);
    this.changeSliderMaxValue = this.changeSliderMaxValue.bind(this);
    this.changeSliderMinValue = this.changeSliderMinValue.bind(this);
    this.changeInput = this.changeInput.bind(this);
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
    // console.log("hello")
    const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
    storyCardObjArraytemp.inputListId = id;
    storyCardObjArraytemp.expVariable = null;
    storyCardObjArraytemp.expValue = this.handleInputExpression(inputExp);
    storyCardObjArraytemp.sliderStatus = false;
    storyCardObjArraytemp.expInput = inputExp;
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[storyCardIndex] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
      () => {
        console.log("storycard in handlingNumericalExpression",this.state.storyCardObj);
        const numericalExpressionArrayTemp = Object.assign({},this.state.numericalExpressionArray[numericalExpressionIndex]);
        numericalExpressionArrayTemp.inputListId = id;
        numericalExpressionArrayTemp.numericalExpression = this.handleInputExpression(inputExp);
        const numericalExpressionObjTemp = Object.assign([],this.state.numericalExpressionArray);
        numericalExpressionObjTemp[numericalExpressionIndex] = numericalExpressionArrayTemp;
        this.setState({numericalExpressionArray : numericalExpressionObjTemp},
            () => {
              this.loadCanvas();
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
        // console.log(this.state.storyCardObj)
        this.loadCanvas();
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
            // console.log("this.state.storyCardObj.length",this.state.storyCardObj.length,"inputExp",inputExp,this.handleInputExpression(inputExp));
            if(this.state.numericalExpressionArray.length !== undefined) {
              this.state.numericalExpressionArray.filter((item) => {
                if(item.inputListId !== id) {
                  // console.log(" not 1st digit");
                  this.handlingNumericalExpression(inputExp,this.state.storyCardObj.length,this.state.numericalExpressionArray.length,id);
                }
              })
              this.state.numericalExpressionArray.filter((item,numericalExpressionArrayIndex) => {
                if(item.inputListId === id) {
                // console.log("other digit");
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
          console.log("storycard in handleSwitchCases",this.state.storyCardObj);
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
            this.handlingMultiInputSingleOutputFunction(inputExp,id);
          }
          else {
            this.handlingMultiInputSingleOutputFunction(inputExp,id);
          }
          break;

      default :
          console.log("next step");
          break;
    }
  }

  handleClickNewButton(e) {
    this.setState(
      { inputList:[...this.state.inputList,
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
        this.loadCanvas();
        // this.state.storyCardObj.map((items,storyCardIndex) => {
        //   var re = /\+|\-|\*|\/|\%/;
        //   this.state.words = items.expInput.split('=');
        //   var sp = this.state.words[1].split(re);
        //   if(sp != null) {
        //     if(sliderVariable === items.expVariable) {
        //       this.loadCanvas();
        //       this.updateStorycard(storyCardIndex,sliderVariable);
        //     }
        //     else {
        //       (sp).forEach(item => {
        //         console.log("sp",sp)
        //         if(variables.test(item)) {
        //           console.log("in var only");
        //           const scopeTemp = Object.assign({},this.state.scope);
        //           scopeTemp[this.state.words[0]] = this.handleInputExpression(items.expInput);
        //           console.log("scope",scopeTemp[this.state.words[0]])
        //           this.setState({scope:scopeTemp});
        //             // () => {
        //               this.loadCanvas();
        //               console.log("scope",scopeTemp[this.state.words[0]])
        //               this.updateStorycard(storyCardIndex,this.state.words[0]);
        //               console.log("storycard",this.state.storyCardObj);
        //           //   }
        //           // );
        //         }
        //       });
        //     }
        //   }
        // })

  //       this.state.storyCardObj.filter((item,storyCardIndex) => {
  //         if(item.expVariable === sliderVariable) {
  //           this.loadCanvas();
  //           this.updateStorycard(storyCardIndex,sliderVariable);
  //         }
  //       });
  //       this.state.storyCardObj.filter(items => {
  //         if(items.expVariable !== sliderVariable) {
  //           var re = /\+|\-|\*|\/|\%/;
  //           this.state.words = items.expInput.split('=');
  //           var sp = this.state.words[1].split(re);
  //           if(sp != null) {
  //             sp.filter(item => {
  //               if(variables.test(item) && item === sliderVariable) {
  //                 console.log("sp",item);
  //               }
  //           });
  //             // console.log("sp",items.expInput,sp.filter(item => (variables.test(item) && item === sliderVariable)));
  //           }
  //         }
  //       });
  //     }
  //   );
  // }
  this.state.storyCardObj.filter((item,storyCardIndex) => {
    if(item.expVariable === sliderVariable) {
      this.updateStorycard(storyCardIndex,sliderVariable);
      this.loadCanvas();
    }
  });
  const temparray = this.state.storyCardObj.filter(items => items.expVariable !== sliderVariable); 
  console.log("temparray",temparray);
  const tempstory = temparray.filter(items => items.inputExp);
    // var re = /\+|\-|\*|\/|\%/;
    // this.state.words = items.expInput.split('=');
    // var sp = this.state.words[1].split(re);
    // if(sp === sliderVariable) {

    // }
    //   // const mapsp = sp.filter(item => (variables.test(item) && item === sliderVariable));
      // if(mapsp.length > 0) {
      //   const scopeTemp = Object.assign({},this.state.scope);
      //   scopeTemp[this.state.words[0]] = this.handleInputExpression(items.expInput);
      //   this.setState({scope:scopeTemp},
      //     () => {
      //       this.updateStorycard(storyCardIndex,this.state.words[0]);
      //       this.loadCanvas();
      //       console.log("storycard",this.state.storyCardObj);
      //     }); 
      // }
  // });
  console.log("tempstory",tempstory);
  
    //   if(sp != null) {
    //     const mapsp = sp.filter(item => {(variables.test(item) && item === sliderVariable));
    //        console.log("going to change",this.state.storyCardObj[storyCardIndex]);
    //         const scopeTemp = Object.assign({},this.state.scope);
    //         scopeTemp[this.state.words[0]] = this.handleInputExpression(items.expInput);
    //         this.setState({scope:scopeTemp},
    //           () => {
    //             this.updateStorycard(storyCardIndex,this.state.words[0]);
    //             this.loadCanvas();
    //             console.log("storycard",this.state.storyCardObj);
    //           }); 
    //   }
    // }
  
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
    let nextValue = e.target.value;
    if (/[0-9]/.test(nextValue)) {
      nextValue = this.state.value;
    }
    this.setState({ value: nextValue });

    console.log("e.target.value",e.target.value);


    if(this.state.storyCardObj.length > 0 ) {
      const arrayobj= Object.assign({},this.state.inputList[index]);
      arrayobj.inputValue = e.target.value;
      const inputList1 = Object.assign([],this.state.inputList);
      inputList1[index] = arrayobj;
      this.setState({inputList:inputList1},
      () => {
        // console.log("inputList",this.state.inputList);
        this.loadCanvas();
        this.setState({changedinputList:true});
        this.handleExpression(this.state.inputList[index].inputValue,index,id);
        // console.log("storycard in changeInput",this.state.storyCardObj);
      });
    }
    else {
      const arrayobj= Object.assign({},this.state.inputList[index]);
      arrayobj.inputValue = e.target.value;
      const inputList1 = Object.assign([],this.state.inputList);
      inputList1[index] = arrayobj;
      this.setState({inputList:inputList1},
      () => {
        this.loadCanvas();
        this.setState({singleEntry : false},
          () => {
            this.setState({changedinputList:true},
              () => {
                this.handleExpression(this.state.inputList[index].inputValue,index,id);
                // console.log("storycard storycard in changeInput first time",this.state.storyCardObj);
              });
          });
      });
    }
   
    if(e.target.value === '') {
      const temp = this.state.storyCardObj.filter(item => item.expInput === this.state.storyCardObj[index].expInput);
      temp.map((item,indexs) => {
        const storyCardObjTemp = Object.assign([],this.state.storyCardObj);
        console.log("storyCardObjTemp",storyCardObjTemp);
        storyCardObjTemp.splice(indexs,1);
        this.loadCanvas();
        // this.setState({storyCardObj : storyCardObjTemp},
        //   () => {
          // console.log("item,indexs",item,indexs)
            // console.log("storycard in changeInput on clear",this.state.storyCardObj);
        //     this.loadCanvas();
        //   });
      // storyCardObjTemp.splice(index,1);
      
      // this.setState({storyCardObj : storyCardObjTemp},
      //   () => {
      //     console.log("storycard in changeInput on clear",this.state.storyCardObj);
      //     this.loadCanvas();
      //   });
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
        onKeyPressSliderInterval ={this.onKeyPressSliderInterval}
        changedinputList = {this.state.changedinputList}
        sliderIntervalOnClick = {this.sliderIntervalOnClick}
        />
      </div> 
    );
  }
}
        
export default Root;