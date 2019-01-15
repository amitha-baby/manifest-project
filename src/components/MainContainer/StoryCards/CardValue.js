import React, { Component } from 'react';
import '../MainContainer.css';

class CardValue extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (  
            <div className="col-2 offset-1 card-value" >
            {(() => {
                if(this.props.sliderExpVariable === null) {
                    return(
                        <div>
                            =
                        </div>
                    )
                }
                else {
                    return(
                        <div>
                            {this.props.sliderExpVariable} = 
                                {this.props.sliderValue[this.props.index] === undefined ? this.props.scope[this.props.sliderExpVariable] : 
                                    (this.props.changedinputList === true) ?
                                        this.props.scope[this.props.sliderExpVariable]
                                        :
                                        this.props.sliderValue[this.props.index]
                                }
                        </div>
                    )
                } 
            })()}
            </div>
        );
    }
}
 
export default CardValue;