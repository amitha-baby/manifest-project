import React, { Component } from 'react';
import './Canvas.css';

class Canvas extends Component {
  render() {

    window.onload = function() {
      var canvas = document.getElementById('main');
      
      const expression = document.getElementById('eq').value;
      var c = canvas.getContext('2d');
      c.beginPath();
      c.moveTo(300,100);
      c.lineTo(1400,100);
      c.lineTo(1400,700);
      c.lineTo(300,700);
      c.lineTo(300,100);
      c.stroke();

      c.fillText(expression, 800,400);
    }
  return(
    <div>
    <main>
    <form id="form"> 
      <input type="text" id="eq" value="34" />
      <input type="submit" value="Draw" />
    </form><div id="plot"></div>
    {window.onload} 
    </main> 
    </div>
  );
  }
}

export default (Canvas);