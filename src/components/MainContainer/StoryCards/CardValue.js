import React, { Component } from 'react';
import '../MainContainer.css';

class CardValue extends Component {
    constructor(props) {
        super(props);
    }

    render() { {
        console.log("this.props.sliderExpValue",this.props.sliderValue[this.props.index])}
        return (  
            <div className="col-2 offset-1">
                {this.props.sliderExpVariable} = 
                    {this.props.sliderValue[this.props.index] === undefined ?   this.props.scope[this.props.sliderExpVariable] : this.props.sliderValue[this.props.index]}
                    {
                        console.log("this.props.sliderValue initially",this.props.sliderValue[this.props.index])
                    }
            </div>
        );
    }
}
 
export default CardValue;