import React, { Component } from 'react';
import './CanvasContainer.css';

const drawerWidth = 240;
var width = ((window.innerWidth)/2) - 50;
var height =  ((window.innerHeight)/2) - 50;
var minLeftBorder = 20;
var x = minLeftBorder;
var y = minLeftBorder;
// var c = canvas.getContext('2d');
var c;


class CanvasContainer extends Component {
  
  constructor(props){
    super(props);
  }

  // createCanvas(x, y, width, height,item) {
  //   var  canv = document.createElement('canvas');
  //   var c = canv.getContext('2d');
  //   canv.width=width;
  //   canv.height=height;
  //   c.strokeStyle="black";
  //   // c.
  //   c.strokeRect(x,y,canv.width,canv.height);
  //   console.log(width,height);
  //   c.strokeRect(x,y,width,height);
  //   c.stroke();
  //   c.fillText(item, width/2,height/2);
  //   return canv;
  // }



  render() {
  return(
      <div>
            {
            this.props.objArray.map((item,index) =>{
              return (
              <div className="canvas-wrap">
                {/* {this.load(item.inputValue)} */}
                  <canvas className="square-canvas"></canvas>
              </div>
              );
            })
          }
      </div>
    
  );
  }
}

export default (CanvasContainer);
