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
                <input type="button" id = "button" value= {this.props.sliderMin} onClick = {() => this.props.sliderMaxOnClick(this.props.index)}/>
                :
                <div>
                    <input 
                        type="text" 
                        id="slider-enter" 
                        maxlength="10" 
                        onChange = {(event) => this.props.changeSliderMinValue(this.props.index,event)}  
                        onKeyPress={(event) => this.props.onKeyPressSliderMaxValue(this.props.index,event)}  
                    />
                    <ChevronLeftIcon />{this.props.sliderExpVariable}<ChevronLeftIcon />{this.props.sliderMax}
                </div>
            }
            </div>
        );
    }
}

export default(SliderMinValue);