import React, { Component } from 'react';
import './Canvas.css';

var canvas = document.getElementById('main');
var c = canvas.getContext('2d');

class Canvas extends Component {
  constructor(props){
    super(props);
    // console.log("object Array is :", JSON.stringify(this.props.objArray));
  }

  componentWillMount(){
    console.log(this.props.objArray);
    c.beginPath();
    c.strokeRect(300,100,1000,600);
    c.fillText(this.props.objArray[1].inputValue, 800,400);
  }

  componentDidUpdate(prevProps) {
    if (this.props.objArray !== prevProps.objArray) {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.beginPath();
      c.strokeRect(300,100,1000,600);
  
      // this.props.objArray.map((item,index) =>{
      //     c.fillText(item.inputValue, 800,400);
      // });

      c.fillText(this.props.objArray[1].inputValue, 800,400);
    }
  }

  render() {
  return(
    <div>
    {
       this.props.objArray.map((item,index) =>{
        return <div>
          {/* {item.inputValue} */}
        </div>
      })
    }
    </div>
  );
  }
}

export default (Canvas);