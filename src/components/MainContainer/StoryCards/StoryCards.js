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
                        status = {this.props.status}
                        scope = {this.props.scope}
                        expInputType = {this.props.expInputType}
                        sliderExpValue={this.props.sliderExpValue}
                        expResult = {this.props.expResult}
                        sliderExpVariable = {this.props.sliderExpVariable}
                        loadCanvas = {this.props.loadCanvas}
                        updateScope = {this.props.updateScope}
                        sliderMinValue = {this.props.sliderMinValue}
                        changedinputList = {this.props.changedinputList}
                        sliderMaxValue = {this.props.sliderMaxValue}
                        changeSliderMinValue = {this.props.changeSliderMinValue}
                        sliderIntervalOnClick = {this.props.sliderIntervalOnClick}
                        changeSliderMaxValue = {this.props.changeSliderMaxValue}
                        onKeyPressSliderInterval ={this.props.onKeyPressSliderInterval}
                   />
            </div>
        ); 
    }          
}

export default(StoryCards);