import React, { Component } from 'react';
import '../MainContainer.css';
import InputRange from 'react-input-range';
import CardValue from './CardValue';

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        inputList :[],
        sliderValueArray: [],
        }
    }

    render() {
        return(
            <div className="slider-field row">
                <div className="col-9">
                {(this.props.sliderStatus === true) &&
                    <InputRange 
                        step={1}
                        maxValue={10}
                        minValue={-10}
                        value={this.state.sliderValueArray[this.props.index] === null ? 0 : this.state.sliderValueArray[this.props.index]}
                        onChange= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValueArray);
                            temp[this.props.index] = value;
                            this.setState({ sliderValueArray: temp},
                                            () => { 
                                            console.log(`onChange slider${this.props.index}: `,this.state.sliderValueArray); 
                             }) 
                        }}
                        onChangeComplete= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValueArray);
                            temp[this.props.index] = value;
                            this.setState({ sliderValueArray: temp},
                                            () => { 
                                            console.log(`onChangeComplete slider${this.props.index}: `,this.state.sliderValueArray); 
                            }) 
                        }}
                    />
                }
                </div>
                <CardValue 
                    sliderValueArray = {this.state.sliderValueArray}
                    index={this.props.index} 
                    sliderExpValue={this.props.sliderExpValue}
                    sliderExpVariable = {this.props.sliderExpVariable}
                />
            </div>    
        );
    }
}

export default(Slider);


