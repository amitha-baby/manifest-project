// import React, { Component } from 'react';
// import Header from './Header/Header';
// import SideBar from './SideBar/SideBar';
// import CanvasContainer from './MainContainer/MainContainer';
// import uniqueId from 'react-html-id';
// import * as math from 'mathjs';
// import 'react-input-range/lib/css/index.css';
// import ReactDOM from 'react-dom';
// // import { string } from 'prop-types';

// var ctx; 
// var tempcount=0;
// var scope = {};

// class Root extends Component {
//   constructor(){
//     super();
//     this.canvasRefs = {};
//     uniqueId.enableUniqueIds(this);
//     this.state = {
//       open: false,
//       countField: 1, 
//       inputList : [],
//       expArr : [],
//       oprArr : ['+','-','*','/','%'],
//       expVariables : [],
//       words : [],
//       storyCardObj : [],
//     };
//     this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
//     this.handleDrawerClose = this.handleDrawerClose.bind(this);
//     this.handleClickNewButton = this.handleClickNewButton.bind(this);
//     this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
//     this.deleteInput = this.deleteInput.bind(this);
//     this.changeInput = this.changeInput.bind(this);
//     this.handleInputExpression = this.handleInputExpression.bind(this);
//     this.getCanvasRef = this.getCanvasRef.bind(this);
//     this.getSliderRef = this.getSliderRef.bind(this);
//     this.loadCanvasWithRef = this.loadCanvasWithRef.bind(this);
//     this.handleExpression = this.handleExpression.bind(this);
//   }

//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });  
//   };

//   handleClickNewButton(e) {
//     tempcount=0;
//     this.setState(
//       { countField: this.state.countField + 1 ,
//         inputList:[...this.state.inputList,
//           {id:this.nextUniqueId,inputValue: ''}
//         ]  
//       },
//         () => {
//                 // this.refs.inputValue.focus();
//                 // document.getElementById("text-field").focus();
//                 // console.log(this.state.inputList[0].id());
//                 // console.log("Array After updation is : ", this.state.inputList);
//                 // this.loadCanvas();
//         })
//   };

  

//   handleKeyPressEnter = event => {
//     if (event.key == 'Enter') {
//       this.handleClickNewButton(event);
//     }
//   };

//   handleInputExpression(inputExp) {
    
//       if(inputExp === '')
//       {
//         return inputExp;
//       }
      
//       try {
//         return math.eval(inputExp,scope);
//       }
//       catch(e)
//       {
//         return "undefined";
//       }
//   }


//   ////////////////////////////////////////////////////////////////////
//   loadCanvas(inputVal) {
//     var canvas = document.getElementsByClassName('canvas-container');
//     {
//       this.state.inputList.map((item,index) =>{
//         for( var i = 0; i< (index + 1); i++){
            
//             ctx = canvas[i].getContext('2d');
            
//             ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);

//             // var result = this.handleInputExpression(item.inputValue);
//             ctx.font = "normal 15px sans-serif";
//             ctx.textAlign='center';
//             ctx.fillText(inputVal, (canvas[i].width)/2,(canvas[i].height)/2);
//         }
//       })
//     }
//   }
//   ///////////////////////////////////////////////////////////////////////


//   getCanvasRef(reference) {
//     console.log("reference",reference);
//     this.canvasRefs = reference;
//   }



//   getSliderRef(reference) {
//     this.sliderRefs = reference;
//   }
 


//   loadCanvasWithRef(reference,index) { 
//   // loadCanvasWithRef(index) { 
//     // var canvas = document.getElementsByClassName('canvas-container');
//     console.log("ref",reference);
//     const canvas = ReactDOM.findDOMNode(reference);
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if(this.state.words[0]) {
//       var result = this.handleInputExpression(this.state.inputList[index].inputValue);
//       ctx.font = "normal 15px sans-serif";
//       ctx.textAlign='center';
//       ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
//     }
//     else {
//       var result = this.state.storyCardObj.expValue;
//       ctx.font = "normal 15px sans-serif";
//       ctx.textAlign='center';
//       ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);
//     }
//   }



//   deleteInput(index,e){
//     // ReactDOM.unmountComponentAtNode(this.canvasRefs['canvas'+index]);
//     const inputList1 = Object.assign([],this.state.inputList);
//     // this.canvasRefs['canvas'+index] =null;
//     // delete this.canvasRefs['canvas'+index];
//     inputList1.splice(index,1);
//     this.setState({inputList:inputList1},
//       () => {
//         // this.canvasRefs['canvas'+index] =null;
//           //  console.log("inputList",this.state.inputList);
//            this.loadCanvas();
//           // ReactDOM.unmountComponentAtNode(this.canvasRefs['canvas'+index]);
//       }
//     );
//   }


//   handleExpression(inputExp,index) {
//     var patternTypeValueOnly = new RegExp("[0-9]");
//     var patternTypeVariableWithValue = new RegExp("[a-z]=[0-9]");
//     console.log("storyCardObj",this.state.storyCardObj);
    
//     if(patternTypeVariableWithValue.test(inputExp)) {
//       console.log("var with value",inputExp);
//       try {
//         // this.state.words = inputExp.split('=');
//         // var patternVar = new RegExp("[a-z]+");
//         // for(var i=0; i< (this.state.words[1].length)/2; i++)
//         // {
//         //   var re = /\+|\-|\*|\/|\%/;
//         //   this.state.expVariables = this.state.words[1].split(re);
//         //   if(patternVar.test(this.state.expVariables[i]) && scope[this.state.expVariables[i]] === undefined)
//         //   { 
//         //     this.setState(scope[this.state.expVariables[i]] = 0);
//         //         this.setState(
//         //           {
//         //             storyCardObj : [ ...this.state.storyCardObj,
//         //                              {inputListIndex : index,
//         //                               expVariable : this.state.expVariables[i],
//         //                               expValue : scope[this.state.expVariables[i]],
//         //                               sliderMinValue: '',
//         //                               sliderMaxValue : '',
//         //                               sliderStep : '',
//         //                               sliderStaus: true,
//         //                              }
//         //                             ]
//         //           },
//         //           () => {
//         //             this.loadCanvas(this.state.storyCardObj.expValue);
//         //             console.log("scope",scope);
//         //           }
//         //         );
//         //       }  
//         // } 
//         // if(tempcount === 0) {
//             this.setState(
//               {
//                 storyCardObj :  [...this.state.storyCardObj,
//                                 {
//                                   inputListIndex : index,
//                                   expVariable : this.state.words[0],
//                                   expValue : scope[this.state.words[0]],
//                                   sliderMinValue: '',
//                                   sliderMaxValue : '',
//                                   sliderStep : '',
//                                   sliderStaus: false,
//                                  }
//                                 ]
//               },
//               () => {
//                 var result = this.handleInputExpression(this.state.inputList[index].inputValue);
//                 this.loadCanvas(result);
//                 console.log("scope",scope);
//                 tempcount =1;
//               }
//             );
//           // }  
//           console.log("storyCardObj",this.state.storyCardObj);
//         }
//       catch(e)
//       {
//         return "undefined";
//       }
//     }

//     else if(patternTypeValueOnly.test(inputExp))
//       {console.log("value only",inputExp);
//         this.setState(
//           {
//             storyCardObj : [ ...this.state.storyCardObj,
//                             {inputListIndex : index,
//                               expVariable : null,
//                               expValue : inputExp,
//                               sliderMinValue: '',
//                               sliderMaxValue : '',
//                               sliderStep : '',
//                               sliderStaus: false,
//                             }
//                             ]
//           },
//           () => {
//             this.loadCanvas(inputExp);
//             console.log("storyCardObj",this.state.storyCardObj);
//           });
      
//       }

//     else{
//       console.log("next step");
//     }
//     console.log("scope",scope);
//   }


//   changeInput(index,e){
//     const arrayobj= Object.assign({},this.state.inputList[index]);
//     arrayobj.inputValue = e.target.value;
//     const inputList1 = Object.assign([],this.state.inputList);
//     inputList1[index] = arrayobj;
//     this.setState({inputList:inputList1},
//       () => {
//         // console.log("this.state.inputList[index].inputValue",this.state.inputList[index].inputValue);
//         this.handleExpression(this.state.inputList[index].inputValue,index);
//         // console.log("this.state.inputList[index].inputValue",this.state.inputList[index].inputValue);
//         // this.loadCanvasWithRef(this.canvasRefs['canvas'+index],index);
//       });
//   }


//   render() {
//     return( 
//       <div>
//         <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
//         { (this.state.open === true)   &&
//           <div>
//             <SideBar 
//               open= "true"
//               inputList={this.state.inputList}
//               countField={this.countField}
//               handleDrawerClose={this.handleDrawerClose}
//               deleteInput={this.deleteInput}
//               changeInput={this.changeInput}
//               handleClickNewButton={this.handleClickNewButton}
//               handleKeyPressEnter={this.handleKeyPressEnter}
//             />
//           </div>
//         }
//         <CanvasContainer 
//           inputList = {this.state.inputList} 
//           open={this.state.open} 
//           editCanvas={this.editCanvas}
//           getSliderRef = {this.getSliderRef}
//           getCanvasRef={this.getCanvasRef}
//           canvasRefs={this.canvasRefs} 
//           expVariables = {this.state.expVariables}
//           loadCanvasWithRef = {this.loadCanvasWithRef}
//           holdingVar = {this.state.words[0]}
//           storyCardObj = {this.state.storyCardObj}
//         />
         
        
//       </div> 
//     );
//   }
// }

// export default Root;



import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './MainContainer/MainContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';
// import { string } from 'prop-types';

var ctx; 
var tempcount=0;
var scope = {};
var prevIndex = null;

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
        return math.eval(inputExp,scope);
      }
      catch(e)
      {
        return "undefined";
      }
  }


  ////////////////////////////////////////////////////////////////////
  loadCanvas(inputVal) {
    var canvas = document.getElementsByClassName('canvas-container');
    {
      this.state.inputList.map((item,index) =>{
        for( var i = 0; i< (index + 1); i++){
            
            ctx = canvas[i].getContext('2d');
            
            ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);

            // var result = this.handleInputExpression(item.inputValue);
            ctx.font = "normal 15px sans-serif";
            ctx.textAlign='center';
            ctx.fillText(inputVal, (canvas[i].width)/2,(canvas[i].height)/2);
        }
      })
    }
  }
  ///////////////////////////////////////////////////////////////////////


  getCanvasRef(reference) {
    console.log("reference",reference);
    this.canvasRefs = reference;
  }



  getSliderRef(reference) {
    this.sliderRefs = reference;
  }
 


  loadCanvasWithRef(reference,index) { 
  // loadCanvasWithRef(index) { 
    // var canvas = document.getElementsByClassName('canvas-container');
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
                          sliderStaus: '',
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
            storyCardObjArraytemp.sliderStaus = false;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[index] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () =>{
                console.log("scope",this.state.storyCardObj[index].expValue,scope[this.state.words[0]]);
                console.log("storyCardObj for 1 value var",this.state.storyCardObj);
              }
            );
    }

    else if(patternTypeValueOnly.test(inputExp)) {
        this.initstoryCardObj();

            const storyCardObjArraytemp= Object.assign({},this.state.storyCardObj[index]);
            storyCardObjArraytemp.inputListIndex = index;
            storyCardObjArraytemp.expVariable = null;
            storyCardObjArraytemp.expValue = inputExp;
            storyCardObjArraytemp.sliderStaus = false;
            const storyCardObjtemp = Object.assign([],this.state.storyCardObj);
            storyCardObjtemp[index] = storyCardObjArraytemp;
            this.setState({storyCardObj:storyCardObjtemp},
              () =>{
                console.log("storyCardObj for value only",this.state.storyCardObj);
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