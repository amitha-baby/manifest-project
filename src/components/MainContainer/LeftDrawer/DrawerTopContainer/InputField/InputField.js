import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      margin: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 150,
    },
  });

  function InputField(props) {
    const { classes } = props;
    
      return(
          <div >
            <Divider />
            <li>
              {/* <Input
                value={props.count}
                className={classes.input}
                disabled
                inputProps={{
                  'aria-label': 'Description',
                }}
              /> */}

               <TextField
                                        required
                                        id={"standard-required"+props.index}
                                        defaultValue="Hello World"
                                        className={classes.textField}
                                        margin="normal"
                                        value={this.state.arrayvar[props.index].value}
                                        onChange={this.handleChange(props.index)}
                                        />
            </li>
          </div>
      );        
    }
  
  InputField.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(InputField);