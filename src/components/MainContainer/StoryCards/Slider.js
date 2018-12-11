import React, { Component } from 'react';
import '../MainContainer.css';
import InputRange from 'react-input-range';
import CardValue from './CardValue';

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        sliderValue: [],
        inputList :[],
        }
    }

    render() {
        
        return(
            <div className="slider-field row">
                <div className="col-9">
                {(this.props.sliderStatus === true) &&
                    <InputRange 
                        step={1}
                        maxValue={this.props.sliderMaxValue}
                        minValue={this.props.sliderMinValue}
                        value={this.state.sliderValue[this.props.index] === undefined ? this.props.scope[this.props.sliderExpVariable] : this.state.sliderValue[this.props.index]}
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
                    }
                </div>
                {(this.props.sliderExpVariable !== null) &&
                    <CardValue 
                        sliderValue = {this.state.sliderValue}
                        index={this.props.index} 
                        scope = {this.props.scope}
                        sliderExpValue={this.props.sliderExpValue}
                        sliderExpVariable = {this.props.sliderExpVariable}
                    />
                }    
            </div>    
        );
    }
}

export default(Slider);


