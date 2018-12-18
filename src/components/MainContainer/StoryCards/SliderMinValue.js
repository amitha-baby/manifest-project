import React, { Component } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import '../MainContainer.css';

class SliderMinValue extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div className = "slider-min"> 
                {(this.props.sliderStatus === true) ?
                    <input type="button" id = "button" value= {this.props.sliderMinValue} onClick = {() => this.props.sliderIntervalOnClick(this.props.index,"min")}/>
                    :
                    <div>
                        <input 
                            type="text" 
                            id="slider-enter" 
                            maxlength="10" 
                            onChange = {(event) => this.props.changeSliderMinValue(this.props.index,event)}
                            onKeyPress={(event) => this.props.onKeyPressSliderInterval(this.props.index,event,this.props.sliderMaxValue)}  
                        />
                        <ChevronLeftIcon/>{this.props.sliderExpVariable}<ChevronLeftIcon />{this.props.sliderMaxValue}
                    </div>
                }
            </div>
        );
    }
}

export default(SliderMinValue);

