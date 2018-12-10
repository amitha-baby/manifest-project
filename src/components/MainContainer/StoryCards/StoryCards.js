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
                        sliderStatus = {this.props.sliderStatus}
                        index={this.props.index} 
                        scope = {this.props.scope}
                        sliderExpValue={this.props.sliderExpValue}
                        sliderExpVariable = {this.props.sliderExpVariable}
                        loadCanvas = {this.props.loadCanvas}
                        updateScope = {this.props.updateScope}
                   />
            </div>
        ); 
    }          
}

export default(StoryCards);