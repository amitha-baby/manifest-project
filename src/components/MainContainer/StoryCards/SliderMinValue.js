import React, { Component } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../MainContainer.css';

class SliderMinValue extends Component {
    constructor(props) {
      super(props);
      this.state = {
        }
    }

    render() {
        return(
            <div className = "slider-max"> 
             {(this.props.sliderStatus === true) ?
                <input type="button" id = "button" value= {this.props.sliderMin} onClick = {() => this.props.sliderMinOnClick(this.props.index)}/>
                :
                <div>
                    <input className = "col-1" type = "text" width = "5px"/>
                    <ChevronLeftIcon />{this.props.sliderExpVariable}<ChevronLeftIcon />{this.props.sliderMin}
                </div>
            }
            </div>
        );
    }
}

export default(SliderMinValue);