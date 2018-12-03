import React, { Component } from 'react';
import '../MainContainer.css';
import Slider from './Slider';

class StoryCards extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <canvas className="canvas-container" 

                        // ref={(ref) => this.props.canvasRefs[`canvas${this.props.index}`] = ref}

                        />
                    </div>
                </div>
                <Slider 
                    holdingVar = {this.props.holdingVar}
                    index={this.props.index} 
                    sliderValue={this.props.sliderValue}
                    sliderExpVariable = {this.props.sliderExpVariable}
                    // scope={this.props.scope}
                    // item={this.props.item}
                    // inputList = {this.props.inputList}
                    />
            </div>
        ); 
    }          
}

export default(StoryCards);