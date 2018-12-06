import React, { Component } from 'react';
import '../MainContainer.css';

class CardValue extends Component {
    constructor(props) {
        super(props);
    }

    render() { {console.log("this.props.sliderExpValue",this.props.sliderExpValue)}
        return (  
            <div className="col-2 offset-1">
                {this.props.sliderExpVariable} = 
                    {this.props.sliderValueArray[this.props.index] === null ?  this.props.sliderExpValue :this.props.sliderValueArray[this.props.index]}
            </div>
        );
    }
}
 
export default CardValue;