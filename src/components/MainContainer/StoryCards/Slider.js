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
        inputList :[]
        }
        this.changeCanvas = this.changeCanvas.bind(this);

    }

    componentWillMount() {
        this.setState({ 
            inputList :this.props.inputList
        })
    }

    changeCanvas(value){
        let temp = Object.assign({}, this.state.inputList);
        temp[this.props.index] = value;
        this.setState({ inputList: temp},
            () => { 
            console.log(`onChangeComplete slider${this.props.index}: `,this.props.inputList); 
        }) 
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
                        value={this.state.sliderValue[this.props.index] == null ? this.props.scope[this.props.sliderExpVariable] : this.state.sliderValue[this.props.index]}
                        onChange= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                            () => { 
                                            console.log(`onChange slider${this.props.index}: `,this.state.sliderValue); 
                                        }) 
                        }}
                        onChangeComplete= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                            () => { 
                                            console.log(`onChangeComplete slider${this.props.index}: `,this.state.sliderValue); 
                                        }) 
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


