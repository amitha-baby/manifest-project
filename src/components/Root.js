import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import MainContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';

var ctx; 
var firstEntry = 0;
var indexTemp = null;

class Root extends Component {
  constructor(){
    super();
    this.canvasRefs = {};
    uniqueId.enableUniqueIds(this);
    this.state = {
      open: false,
      countField: 1, 
      inputList : [],
      words : [],
      storyCardObj : [],
      scope : {},
      prevIndex : 0,
      status : null,
      changedinputList : null,
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
        firstEntry = 0; 

                //this.inputValue.focus();
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
        return math.eval(inputExp,this.state.scope);
      }
      catch(e)
      {
        return "undefined";
      }
  }

  updateScope(sliderVariable,sliderValue) {
    const storyCardObjArraytemp = Object.assign({},this.state.scope);
    storyCardObjArraytemp[sliderVariable] = sliderValue;
    this.setState({scope:storyCardObjArraytemp},
      () =>{
        this.state.storyCardObj.map((item,index) => {
          if(sliderVariable === item.expVariable) {
            this.setState({prevIndex : index},
              () =>
              {
                const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.prevIndex]);
                storyCardObjArraytemp.expValue = this.state.scope[sliderVariable];
                const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                storyCardObjtemp[this.state.prevIndex] = storyCardObjArraytemp;
                this.setState({storyCardObj:storyCardObjtemp},
                  () =>{
                    this.loadCanvas();
                  }
                );
              }
            );
          }
        });
      }
    );
  }

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

  loadCanvasWithRef(reference,index) { 
    const canvas = ReactDOM.findDOMNode(reference);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // if(this.state.words[0]) {
    //   var result = this.handleInputExpression(this.state.inputList[index].inputValue);
    //   ctx.font = "normal 15px sans-serif";
    //   ctx.textAlign='center';
    //   ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
    // }
    // else {
    //   var result = this.state.storyCardObj.expValue;
    //   ctx.font = "normal 15px sans-serif";
    //   ctx.textAlign='center';
    //   ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
    // }
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
                  console.log(this.state.scope);
                  console.log("e[scopeTemp]",this.state.scope[scopeTemp]);
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
    storyCardObjArraytemp.sliderStatus = false;
    const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
    storyCardObjtemp[index] = storyCardObjArraytemp;
    this.setState({storyCardObj:storyCardObjtemp},
      () =>{
        this.setState({status:sliderMinOrMax});
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
                         }
                        ]
      },
    );
  }

  handleExpression(inputExp,index) {
    console.log("in handleExpression",inputExp,index);
    var patternTypeValueOnly = /\d+/;
    var patternTypeVariableWithValue = /[a-z]\=[\+|\-]?\d+/i;
    var sliderMinVal = -10;
    var sliderMaxVal = 10;

    if(patternTypeVariableWithValue.test(inputExp)) {
      console.log("inside patternTypeVariableWithValue",inputExp);
        this.state.words = inputExp.split('=');

        if(this.state.scope[this.state.words[0]] === undefined) {
          console.log("inside undefined",inputExp);
          this.initstoryCardObj();
          var result = this.handleInputExpression(this.state.inputList[index].inputValue);

          const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.storyCardObj.length]);
          storyCardObjArraytemp.inputListIndex = index;
          storyCardObjArraytemp.expVariable = this.state.words[0];
          storyCardObjArraytemp.expValue = result;
          storyCardObjArraytemp.sliderStatus = true;
          storyCardObjArraytemp.sliderMinValue = sliderMinVal;
          storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
          storyCardObjArraytemp.expInput = inputExp;
          const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
          storyCardObjtemp[this.state.storyCardObj.length] = storyCardObjArraytemp;
          this.setState({storyCardObj:storyCardObjtemp},
            () =>{
              this.loadCanvas();
            }
          );
        }

        else {
          var result = this.handleInputExpression(this.state.inputList[index].inputValue);
          this.state.storyCardObj.map((item,storyCardIndex) => {
            if(this.state.words[0] === item.expVariable) {
                  const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[storyCardIndex]);
                  storyCardObjArraytemp.inputListIndex = index;
                  storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                  // alert(storyCardObjArraytemp.expValue);
                  if(this.state.scope[this.state.words[0]] > '10') {
                    sliderMaxVal = this.state.scope[this.state.words[0]] ;
                  }
                  if(this.state.scope[this.state.words[0]] < '-10') {
                    sliderMinVal = this.state.scope[this.state.words[0]];
                  }
                  this.state.inputList.value = storyCardObjArraytemp.expValue;
                  storyCardObjArraytemp.sliderMinValue = sliderMinVal;
                  storyCardObjArraytemp.sliderMaxValue = sliderMaxVal;
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

    else if(patternTypeValueOnly.test(inputExp)) {
      console.log("inputExp.length",inputExp.length);
      var result = this.handleInputExpression(this.state.inputList[index].inputValue);
      if(firstEntry === 0) {
        firstEntry = 1;
        this.initstoryCardObj();
        indexTemp = this.state.storyCardObj.length;
      }
      const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[indexTemp]);
      storyCardObjArraytemp.inputListIndex = index;
      storyCardObjArraytemp.expVariable = null;
      storyCardObjArraytemp.expValue = result;
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
      }

    else {
      console.log("next step");
    }
  }

  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    console.log("e.target.value",e.target.value);
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1[index] = arrayobj;
    this.setState({inputList:inputList1},
      () => {
        this.setState({changedinputList:true});
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