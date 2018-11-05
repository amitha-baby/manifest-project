import React from 'react';
import PropTypes from 'prop-types';
import './InputDiv.css';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

class InputDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {countField: 0,value:20,
            // inputValue:0
        }
        // this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.setState((state, props) => ({
            counter: state.countField + props.count
        }));
    }

    // delete(evt) {
    //     this.setState({
    //       inputValue: evt.target.value
    //     });
    // }
      
    render() {

        const expr= function() {
        const expression = document.getElementById('text-field').value;
        return expression;
        }

        const deleteItem = 
        (
            <IconButton > 
                <Icon className="delete-button delete-hover" 
                    // onClick={this.delete(item)}
                >
                    clear
                </Icon>
            </IconButton>
    )
        return(
            <div className="input-container">
                <div className="input-countfield" >  {this.state.counter} </div>
                <div className="input-div-container">
                    <TextField id="text-field" 
                        placeholder="Enter Note"
                        
                         />  
                {/* {console.log(expr)} */}
                    {/* <Canvas 
                    expression={this.expr}
                    />
                    */}
                </div>
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