import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputField from '../InputField/InputField';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 270;

const styles = theme =>({
icon: {
    margin: theme.spacing.unit * 1,
  },
toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  input: {
    margin: theme.spacing.unit,
  },
});
  
class AddButton extends Component {
    constructor(props) {
        super(props);
        this.state = {countField: 1, arrayvar : []};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(
            this.setState({ countField: this.state.countField + 1 ,
                arrayvar: [...this.state.arrayvar, {id : "", value :"Input Field"}]
            }, () => {
                console.log("Array After updation is : ", this.state.arrayvar)
            })
        )
      };

      handleChange = index => event =>{
        var item = this.state.arrayvar;
        item[index].value = event.target.value;
        this.setState({
          arrayvar: item,
        },() => {
            console.log("Array after modification is : ",JSON.stringify(this.state.arrayvar));
        });
      };
    

        render() {
            const {classes} = this.props;
            // const isButtonPressed = this.state.countField;
            // let buttonpress;

            // if (isButtonPressed > 0) {
            //     buttonpress = <InputField count={isButtonPressed} id = {this.state.index}/>
            //     console.log(isButtonPressed );      
            //     console.log(this.state.index );       
            // }
            return(
                <div >
                    <IconButton className="addButton-container"> 
                        <Icon className={classes.icon} onClick={this.handleClick}>
                        add
                        </Icon>
                    </IconButton>
                    

                    <div>
                        {
                            this.state.arrayvar.map((item, index) => (
                                <li>
                                     <TextField
                                        required
                                        id={"standard-required"+index}
                                        defaultValue="Hello World"
                                        className={classes.textField}
                                        margin="normal"
                                        value={this.state.arrayvar[index].value}
                                        onChange={this.handleChange(index)}
                                        />
                                </li>
                                // <li>{buttonpress }</li> 
                            )
                        )}
                    </div>


                </div>
            );
    }
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AddButton);
