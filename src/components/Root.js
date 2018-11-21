import React, { Component } from 'react';
import Header from './Header/Header';
import SideBar from './SideBar/SideBar';
import CanvasContainer from './CanvasContainer/CanvasContainer';
import uniqueId from 'react-html-id';
import * as math from 'mathjs';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

var ctx;
var scope ={};

class Root extends Component {
  constructor(){
    super();
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
                this.loadCanvas();
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
        //     () =>{
        //       return(
        //         <InputRange
        //                             step={1}
        //                             maxValue={10}
        //                             minValue={-10}
        //                             value={this.state.value}
        //                             onChange={value => this.setState({ value })}
        //                             onChangeComplete={value => console.log(value)} />
        //       )
        //     }
        //     var slider = document.getElementsByClassName('input-range');
        //     console.log(slider);
        }
      })
    }
  }

  deleteInput(index,e){
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1.splice(index,1);
    this.setState({inputList:inputList1},
      () => {
        this.loadCanvas();
      });
  }

  changeInput(index,e){
    const arrayobj= Object.assign({},this.state.inputList[index]);
    arrayobj.inputValue = e.target.value;
    const inputList1 = Object.assign([],this.state.inputList);
    inputList1[index] = arrayobj;
    this.setState({inputList:inputList1},
      () => {
        this.loadCanvas();
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
        <CanvasContainer inputList = {this.state.inputList} open={this.state.open}/>
      </div> 
    );
  }
}

export default Root;