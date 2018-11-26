import React, { Component } from 'react';
import '../MainContainer.css';
import Slider from './Slider';

class VisualExpression extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <canvas className="canvas-container" ref={(ref) => this.props.canvasRefs[`canvas${this.props.index}`] = ref}/>
                    </div>
                </div>
                <Slider 
                    index={this.props.index} 
                    item={this.props.item}
                    inputList = {this.props.inputList}/>
            </div>
        ); 
    }          
}

export default(VisualExpression);