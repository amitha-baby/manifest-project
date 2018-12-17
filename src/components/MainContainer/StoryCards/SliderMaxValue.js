import React, { Component } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../MainContainer.css';

class SliderMaxValue extends Component {
    constructor(props) {
      super(props);
      this.state = {
          value : 0
        }
    }

    render() {
        return(
            <div className = "slider-max"> 
             {(this.props.sliderStatus === true) ?
                <input type="button" id = "button" value= {this.props.sliderMax} onClick = {() => this.props.sliderMaxOnClick(this.props.index)}/>
                :
                <div>
                    {this.props.sliderMin}<ChevronRightIcon />{this.props.sliderExpVariable}<ChevronRightIcon />
                    <input 
                        type="text" 
                        id="slider-enter" 
                        maxlength="10" 
                        onChange = {(event) => this.props.changeSliderMaxValue(this.props.index,event)}  
                        onKeyPress={(event) => this.props.onKeyPressSliderMaxValue(this.props.index,event)}  
                    />
                </div>
            }
            </div>
        );
    }
}

export default(SliderMaxValue);