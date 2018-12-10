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
        scope : {}
        }
    }

    componentDidMount() {
        this.setState(() => ({
            scope : this.props.scope,
        }));
      }

    componentDidUpdate(prevProps) {
        if (this.props.scope !== prevProps.scope) {
          this.setState({
            scope : this.props.scope
          });
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
                        value={this.state.sliderValue[this.props.index] === undefined ? this.state.scope[this.props.sliderExpVariable] : this.state.sliderValue[this.props.index]}
                        onChange= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                () => {
                                    // this.props.updateScope();


                                    const storyCardObjArraytemp = Object.assign({},this.state.scope);
                                    storyCardObjArraytemp[this.props.sliderExpVariable] = this.state.sliderValue[this.props.index];
                                    this.setState({scope:storyCardObjArraytemp},
                                        () =>{
                                                // console.log(this.state.scope[this.props.sliderExpVariable]);
                                                this.props.loadCanvas();
                                            }
                                        );
                                    }
                            );
                        }}
                        onChangeComplete= { value => 
                        {
                            let temp = Object.assign({}, this.state.sliderValue);
                            temp[this.props.index] = value;
                            this.setState({ sliderValue: temp},
                                () => {
                                    // this.props.updateScope();


                                    const storyCardObjArraytemp = Object.assign({},this.state.scope);
                                    storyCardObjArraytemp[this.props.sliderExpVariable] = this.state.sliderValue[this.props.index];
                                    this.setState({scope:storyCardObjArraytemp},
                                        () =>{
                                            console.log(this.state.scope);
                                            this.props.loadCanvas();
                                            }
                                        );
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
                        scope = {this.state.scope}
                        sliderExpValue={this.props.sliderExpValue}
                        sliderExpVariable = {this.props.sliderExpVariable}
                    />
                }    
            </div>    
        );
    }
}

export default(Slider);


