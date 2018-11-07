import React from 'react';
import PropTypes from 'prop-types';
import './InputDiv.css';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

class InputDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countField: 0,
            value:20,
        }
    }
    componentDidMount() {
        this.setState((state, props) => ({
            counter: state.countField + props.count
        }));
    }
      
    render() {
        const deleteItem = (
            <IconButton > 
                <Icon className="delete-button delete-hover" 
                    onClick={this.props.deleteEvent}
                >
                    clear
                </Icon>
            </IconButton>
        )
        return(
            <div className="input-container">
            <form className="form-inline" ref="inputForm">
                <div className="form-group">
                <div className="input-countfield" >  {this.props.counter} </div>
                <div className="input-div-container">
                    <input 
                        type="text" 
                        id="text-field" 
                        ref="inputValue"
                        placeholder="Enter Note"
                        // value={this.props.inputVal}
                        onChange={(event) => this.props.changeEvent(1,event)} 
                    /> 
                </div>
                </div>
            </form>

                
                <div>  
                    {deleteItem}  
                </div>
            </div>    
        );
    }
}

InputDiv.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default (InputDiv);