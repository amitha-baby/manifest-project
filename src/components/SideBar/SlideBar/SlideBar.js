import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import './sidebar.css';
import SideBar from '../SideBar';
import Drawer from '@material-ui/core/Drawer';

const styles = theme =>({
    rightIcon: {
        right: theme.spacing.unit * 2,
      },
});
  
class AddButton extends Component {
     constructor(props) {
         super(props);
         this.state = {slideButton: true};
         this.handleClick = this.handleClick.bind(this);
     }

    handleClick(e) {
        e.preventDefault();
        this.setState(
            this.setState({ slideButton: !this.state.slideButton})
        )
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
      
    

        render() {
            const {classes} = this.props;
            // const isButtonPressed = this.state.countField;
            // let buttonpress;

            // if(isButtonPressed) {
            //     buttonpress = <SideBar />        
            // }

            const sideList = (
                <div>
                    <SideBar />  
                </div>
            );

            return(
                <div className="sidebar-container">
                    <IconButton className="back-btn"> 
                        <Icon className={classes.rightIcon} onClick={this.toggleDrawer('left', false)} >
                        chevron_left
                        </Icon>
                    </IconButton>

                    <Drawer onClose={this.state.left} open={this.toggleDrawer('left', false)} >
                    
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {sideList}
                        </div>
                    </Drawer>

                    {/* {buttonpress} */}
                </div>
            );
    }
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AddButton);
