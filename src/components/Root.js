import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import MainContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';

var ctx; 
// var scope = {};

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
        math.eval(inputExp,this.state.scope);
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
                    console.log(this.state.storyCardObj);
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
    var patternTypeVar = /[a-z]\=\d+/i;
    this.state.storyCardObj.map((item,index) => {
          ctx = canvas[index].getContext('2d');
          ctx.clearRect(0, 0, canvas[index].width, canvas[index].height);
          ctx.font = "normal 15px sans-serif";
          ctx.textAlign='center';
          if(patternTypeVar.test(item.expInput) === false) {
            ctx.fillText(item.expValue, (canvas[index].width)/2,(canvas[index].height)/2);
          }
          else {
            ctx.fillText(this.state.scope[item.expVariable], (canvas[index].width)/2,(canvas[index].height)/2);
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
                  this.loadCanvas();}
            );
        }
        else {
          console.log(this.state.scope);
          this.loadCanvas();
        }
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
        this.state.words = inputExp.split('=');

        if(this.state.scope[this.state.words[0]] === undefined) {
          this.initstoryCardObj();
          this.handleInputExpression(this.state.inputList[index].inputValue);
          const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
          storyCardObjArraytemp.inputListIndex = index;
          storyCardObjArraytemp.expVariable = this.state.words[0];
          storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
          storyCardObjArraytemp.sliderStatus = true;
          storyCardObjArraytemp.expInput = inputExp;
          const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
          storyCardObjtemp[index] = storyCardObjArraytemp;
          this.setState({storyCardObj:storyCardObjtemp},
            () =>{
              console.log("story card",this.state.storyCardObj);
              this.loadCanvas();
            }
          );
        }

        else {
          this.handleInputExpression(this.state.inputList[index].inputValue);
          this.state.storyCardObj.map((item,index) => {
            if(this.state.words[0] === item.expVariable) {
              this.setState({prevIndex : index},
                () =>
                {
                  const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[this.state.prevIndex]);
                  storyCardObjArraytemp.expValue = this.state.scope[this.state.words[0]];
                  storyCardObjArraytemp.expInput = inputExp;
                  const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
                  storyCardObjtemp[this.state.prevIndex] = storyCardObjArraytemp;
                  this.setState({storyCardObj:storyCardObjtemp},
                    () =>{
                      console.log("story card",this.state.storyCardObj);
                      this.loadCanvas();
                    }
                  );
                }
              );
            }
          });
        }
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
              console.log("story card",this.state.storyCardObj);
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
        <MainContainer 
          open={this.state.open} 
          scope = {this.state.scope}
          storyCardObj = {this.state.storyCardObj}
          loadCanvas = {this.loadCanvas}
          updateScope = {this.updateScope}
        />
      </div> 
    );
  }
}

export default Root;