import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';
// import { string } from 'prop-types';

var ctx; var tempcount=0;
// var scope ={};

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
      oprArr : ['+','-','*','/','%'],
      expVariables : [],
      scope : {},
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
    this.getCanvasRef = this.getCanvasRef.bind(this);
    this.getSliderRef = this.getSliderRef.bind(this);
    this.loadCanvasWithRef = this.loadCanvasWithRef.bind(this);
    this.handleExpression = this.handleExpression.bind(this);
    // this.handleExpressiontemp = this.handleExpressiontemp.bind(this); 
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });  
  };

  handleClickNewButton(e) {
    tempcount=0;
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

        // var words = inputExp.split('=');
        // var patternVar = new RegExp("[a-z]+");
        // for(var i=0; i< (words[1].length)/2; i++)
        // {
        //   var re = /\+|\-|\*|\/|\%/;
        //   this.state.expVariables = words[1].split(re);
        //   // console.log(this.state.expVariables[i]);
        //   // console.log(this.state.expVariables[1]);
        //   // console.log(this.state.expVariables[2]);

        //   // this.state.counterVar++;
        //   console.log("scope in root",this.state.scope);
        //   if(patternVar.test(this.state.expVariables[i]) && this.state.scope[this.state.expVariables[i]] === undefined)
        //   { 
        //       // console.log("inside loop",this.state.expVariables[i]);
        //       // console.log("scope in root",scope);
        //       this.state.scope[this.state.expVariables[i]] = 0;
        //       // console.log( scope[this.state.expVariables[i]]);
        //       // console.log("after scope var only",scope[this.state.expVariables[i]]);
        //   }
        // } 
        return math.eval(inputExp, this.state.scope);
      }
      catch(e)
      {
        return "undefined";
      }
  }

  expValueHoldingVariable(inputExp) {
    var pattern = new RegExp("[a-z]+");
    var exp = pattern.exec(inputExp);
    console.log("scope",this.state.scope.a);
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
 


  // loadCanvasWithRef(reference,index) { 
  loadCanvasWithRef(index) { 
    var canvas = document.getElementsByClassName('canvas-container');
    // const canvas = ReactDOM.findDOMNode(reference);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(this.state.words[0]) {
      var result = this.handleInputExpression(this.state.inputList[index].inputValue);
      ctx.font = "normal 15px sans-serif";
      ctx.textAlign='center';
      ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
    }
    else {

    }
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



  // updateStoryCardObj() {
  //   this.setState(
  //     {
  //       storyCardObj : [
  //       {
  //         inputListIndex : '',
  //         expVariable : this.state.expVariables[i],
  //         expValue : '',
  //         sliderMinValue: '',
  //         sliderMaxValue : '',
  //         sliderStep : '',
  //       }
  //       ]
  //     }
  //   )
  // }

  handleExpression(inputExp,index) {
    try {
      this.state.words = inputExp.split('=');
      var patternVar = new RegExp("[a-z]+");
      for(var i=0; i< (this.state.words[1].length)/2; i++)
      {
        var re = /\+|\-|\*|\/|\%/;
        this.state.expVariables = this.state.words[1].split(re);
        if(patternVar.test(this.state.expVariables[i]) && this.state.scope[this.state.expVariables[i]] === undefined)
        { 
            console.log("inside root  loop",this.state.expVariables[i]);
            this.state.scope[this.state.expVariables[i]] = 0;
              this.setState(
                {
                  storyCardObj : [ ...this.state.storyCardObj,
                                   {inputListIndex : index,
                                    expVariable : this.state.expVariables[i],
                                    expValue : this.state.scope[this.state.expVariables[i]],
                                    sliderMinValue: '',
                                    sliderMaxValue : '',
                                    sliderStep : '',
                                    sliderStaus: true,
                                   }
                                  ]
                },
                () => {
                  console.log("storyCardObj",this.state.storyCardObj);
                }
              );
            }  
      } 
      if(tempcount === 0) {
        this.setState(
          {
            storyCardObj :  [...this.state.storyCardObj,
                            {
                              inputListIndex : index,
                              expVariable : this.state.words[0],
                              expValue : this.state.scope[this.state.words[0]],
                              sliderMinValue: '',
                              sliderMaxValue : '',
                              sliderStep : '',
                              sliderStaus: false,
                             }
                            ]
          },
          () => {
            console.log("storyCardObj",this.state.storyCardObj);tempcount =1;
          }
        );
      }
    }
    catch(e)
    {
      return "undefined";
    }
  }


  // handleExpressiontemp(inputExp) {
  //   if(inputExp === '')
  //   {
  //     return null;
  //   }
  //   try {
  //     this.state.words = inputExp.split('=');
  //     var patternVar = new RegExp("[a-z]+");
  //     for(var i=0; i< (this.state.words[1].length)/2; i++)
  //     {
  //       var re = /\+|\-|\*|\/|\%/;
  //       this.state.expVariables = this.state.words[1].split(re);
  //       // console.log(this.state.expVariables[i]);
  //       // console.log(this.state.expVariables[1]);
  //       // console.log(this.state.expVariables[2]);

  //       // this.state.counterVar++;
  //       // console.log("scope in root",this.state.scope);
  //       if(patternVar.test(this.state.expVariables[i]) && this.state.scope[this.state.expVariables[i]] === undefined)
  //       { 
  //           console.log("inside root  loop",this.state.expVariables[i]);
  //           // console.log("scope in root",scope);
  //           this.state.scope[this.state.expVariables[i]] = 0;
  //           // console.log( scope[this.state.expVariables[i]]);
  //           // console.log("after scope var only",scope[this.state.expVariables[i]]);
  //       }
  //     } 
  //     console.log("expVariables in roottemp", this.state.expVariables);
  //     console.log("expVariables length in roottemp", this.state.expVariables.length);
  //     return this.state.expVariables;
  //   }
  //   catch(e)
  //   {
  //     return null;
  //   }
  // }


  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1[index] = arrayobj;
    this.setState({inputList:inputList1},
      () => {
        // console.log("this.state.inputList[index].inputValue",this.state.inputList[index].inputValue);
        this.handleExpression(this.state.inputList[index].inputValue,index);
        // console.log("this.state.inputList[index].inputValue",this.state.inputList[index].inputValue);
        // this.loadCanvasWithRef(this.canvasRefs['canvas'+index],index);
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
          scope={this.state.scope}
          expVariables = {this.state.expVariables}
          loadCanvasWithRef = {this.loadCanvasWithRef}
          holdingVar = {this.state.words[0]}
          storyCardObj = {this.state.storyCardObj}

        />
         
        
      </div> 
    );
  }
}

export default Root;