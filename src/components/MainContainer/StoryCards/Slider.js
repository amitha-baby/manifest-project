import React, { Component } from 'react';
import '../MainContainer.css';
import InputRange from 'react-input-range';

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        sliderValueArray: [],
        inputList :[]
        }
        // this.changeCanvas = this.changeCanvas.bind(this);

    }

    // componentWillMount() {
    //     this.setState({ 
    //         inputList :this.props.inputList
    //     })
    // }

    // changeCanvas(value){
    //     let temp = Object.assign({}, this.state.inputList);
    //     temp[this.props.index] = value;
    //     this.setState({ inputList: temp},
    //         () => { 
    //         console.log(`onChangeComplete slider${this.props.index}: `,this.props.inputList); 
    //     }) 
    // }

    render() {
      
        return(
            <div className="slider-field row">
                <div className="col-9">
                    <InputRange 
                        step={1}
                        maxValue={10}
                        minValue={-10}
                        value={this.state.sliderValueArray[this.props.index] == null ? this.props.sliderValue : this.state.sliderValueArray[this.props.index]}
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
                </div>
                <div className="col-2 offset-1">
                    <div>
                    {this.props.sliderExpVariable}= {this.state.sliderValueArray[this.props.index] == null ?  this.props.sliderValue :this.state.sliderValueArray[this.props.index]}

                    {/* {this.props.item}={this.state.sliderValueArray[this.props.index] == null ? this.props.item : this.state.sliderValueArray[this.props.index]} */}
                    {/* {this.changeCanvas(this.state.sliderValueArray[this.props.index])} */}
                    </div>
                </div>
            </div>    
        );
    }
}

export default(Slider);


