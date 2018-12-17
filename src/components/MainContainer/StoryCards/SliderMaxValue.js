import React, { Component } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../MainContainer.css';

class SliderMaxValue extends Component {
    constructor(props) {
      super(props);
      this.state = {
        }
    }

    render() {
        return(
            <div className = "slider-max"> 
             {(this.props.sliderStatus === true) ?
                <input type="button" id = "button" value= {this.props.sliderMax} onClick = {() => this.props.sliderMaxOnClick(this.props.index)}/>
                :
                <div>
                    {this.props.sliderMax}<ChevronRightIcon />{this.props.sliderExpVariable}<ChevronRightIcon />
                    <input type="text" id="slider-max-enter" maxlength="10" width="2"/>
                </div>
            }
            </div>
        );
    }
}

export default(SliderMaxValue);