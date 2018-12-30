import React, { Component } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../MainContainer.css';

class SliderMaxValue extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return(
            <div className = "slider-max"> 
             {(this.props.sliderStatus === true ) ?
                <input type="button" id = "button" value= {this.props.sliderMaxValue} onClick = {() => this.props.sliderIntervalOnClick(this.props.index,"max")}/>
                :
                (this.props.expInputType === undefined) && 
                   (<div>
                        {this.props.sliderMinValue}<ChevronRightIcon />{this.props.sliderExpVariable}<ChevronRightIcon />
                        <input 
                            type="text" 
                            id="slider-enter" 
                            maxlength="10" 
                            onChange = {(event) => this.props.changeSliderMaxValue(this.props.index,event)}  
                            onKeyPress={(event) => this.props.onKeyPressSliderInterval(this.props.index,event,this.props.sliderMinValue)}  
                        />
                    </div>)
            }
            </div>
        );
    }
}

export default(SliderMaxValue);