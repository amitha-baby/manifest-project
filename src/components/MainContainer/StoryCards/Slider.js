import React, { Component } from 'react';
import '../MainContainer.css';
import InputRange from 'react-input-range';
import CardValue from './CardValue';
import SliderMaxValue from './SliderMaxValue';
import SliderMinValue from './SliderMinValue';

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        sliderValue: [],
        }
    }

    render() {
        
        return(
            <div className="slider-field row">
                {(this.props.sliderStatus === true) ?
                    <div className="col-1">
                        <SliderMinValue 
                            sliderMinValue = {this.props.sliderMinValue}
                            sliderMaxValue = {this.props.sliderMaxValue}
                            index = {this.props.index}
                            sliderStatus = {this.props.sliderStatus}
                            sliderIntervalOnClick = {this.props.sliderIntervalOnClick}
                            sliderExpVariable = {this.props.sliderExpVariable}
                            changeSliderMinValue = {this.props.changeSliderMinValue}
                            onKeyPressSliderInterval ={this.props.onKeyPressSliderInterval}
                        />
                    </div>
                    :
                    (this.props.status === "min") &&
                    <div className="offset-4 col-5">
                        <SliderMinValue 
                           sliderMinValue = {this.props.sliderMinValue}
                           sliderMaxValue = {this.props.sliderMaxValue}
                           index = {this.props.index}
                           sliderStatus = {this.props.sliderStatus}
                           sliderIntervalOnClick = {this.props.sliderIntervalOnClick}
                           sliderExpVariable = {this.props.sliderExpVariable}
                           changeSliderMinValue = {this.props.changeSliderMinValue}
                           onKeyPressSliderInterval ={this.props.onKeyPressSliderInterval}
                        />
                    </div>
                }
                {(this.props.sliderStatus === true) &&
                <div className="col-7" id="slider-input-range">
                    <InputRange 
                        step={1}
                        maxValue = {this.props.sliderMaxValue} 
                        minValue = {this.props.sliderMinValue}
                        value = {this.state.sliderValue[this.props.index] === undefined ? this.props.scope[this.props.sliderExpVariable] : 
                                    (this.props.changedinputList === true) ?
                                            this.props.scope[this.props.sliderExpVariable]
                                            :
                                            this.state.sliderValue[this.props.index]
                                }
                        onChange= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                () => {
                                    this.props.updateScope(this.props.sliderExpVariable,this.state.sliderValue[this.props.index]);
                                    }
                            );
                        }}
                        onChangeComplete= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                () => {
                                    this.props.updateScope(this.props.sliderExpVariable,this.state.sliderValue[this.props.index]);
                                    }
                            );
                        }}
                    />
                </div>
                }
                {(this.props.sliderStatus === true) ?
                    <div className="col-1">
                        <SliderMaxValue 
                            sliderMaxValue = {this.props.sliderMaxValue}
                            index = {this.props.index}
                            sliderStatus = {this.props.sliderStatus}
                            sliderIntervalOnClick = {this.props.sliderIntervalOnClick}
                            sliderExpVariable = {this.props.sliderExpVariable}
                            changeSliderMaxValue = {this.props.changeSliderMaxValue}
                            sliderMinValue = {this.props.sliderMinValue}
                            onKeyPressSliderInterval ={this.props.onKeyPressSliderInterval}
                        />
                    </div>
                    :
                    (this.props.status === "max") &&
                    <div className="offset-4 col-5">
                        <SliderMaxValue 
                            sliderMaxValue = {this.props.sliderMaxValue}
                            index = {this.props.index}
                            sliderStatus = {this.props.sliderStatus}
                            sliderIntervalOnClick = {this.props.sliderIntervalOnClick}
                            changeSliderMaxValue = {this.props.changeSliderMaxValue}
                            sliderExpVariable = {this.props.sliderExpVariable}
                            sliderMinValue = {this.props.sliderMinValue}
                            onKeyPressSliderInterval ={this.props.onKeyPressSliderInterval}
                        />
                    </div>
                }
                {(this.props.sliderExpVariable !== null) &&
                    <CardValue 
                        sliderValue = {this.state.sliderValue}
                        index={this.props.index} 
                        scope = {this.props.scope}
                        sliderExpValue={this.props.sliderExpValue}
                        changedinputList = {this.props.changedinputList}
                        sliderExpVariable = {this.props.sliderExpVariable}
                    />
                }    
            </div>    
        );
    }
}

export default(Slider);


