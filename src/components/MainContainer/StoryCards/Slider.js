import React, { Component } from 'react';
import '../MainContainer.css';
import InputRange from 'react-input-range';

class Slider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 0,
        sliderValue: [],
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
                        value={this.state.sliderValue[this.props.index] == null ? this.props.scope[this.props.item] : this.state.sliderValue[this.props.index]}
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
                </div>
                <div className="col-2 offset-1">
                    <div>
                    {this.props.item}= {this.state.sliderValue[this.props.index] == null ? this.props.scope[this.props.item] :this.state.sliderValue[this.props.index]}

                    {/* {this.props.item}={this.state.sliderValue[this.props.index] == null ? this.props.item : this.state.sliderValue[this.props.index]} */}
                    {/* {this.changeCanvas(this.state.sliderValue[this.props.index])} */}
                    </div>
                </div>
            </div>    
        );
    }
}

export default(Slider);


