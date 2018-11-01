import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import './DrawerTopContainer.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit * 1,
      },
});

class DrawerTopContainer extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = { slideLeft: true};
        this.handleDrawerToggle=this.handleDrawerToggle.bind(this);
    }
    
    handleClick = () => {
        this.setState({ slideLeft: false });
    };        

    handleDrawerToggle = () => {
        this.setState({ slideLeft: !this.state.slideLeft });
    };

    render() {
    const { classes} = this.props;
    return(
        <div className={classes.root}>
        <CssBaseline />
        {(this.state.slideLeft) &&
            <div>
                <Drawer
                    container={this.props.container}
                    variant="temporary"
                    open={this.state.slideLeft}
                    onClose={this.handleClick}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, 
                    }}
                >
                <div>
                    <IconButton className="addButton-container"> 
                        <Icon className={classes.icon}>
                            add
                        </Icon>
                    </IconButton>

                    <IconButton className="slidebar-chevron-left"> 
                        <Icon className={classes.icon} onClick={this.handleDrawerToggle}>
                            chevron_left
                        </Icon>
                    </IconButton>
                </div>
                </Drawer>
            </div>
        }

        {(this.state.slideLeft === false) &&
           <div className="sidebar-container-right">
           <IconButton>
               <Icon onClick={this.handleDrawerToggle}>
                 chevron_right
               </Icon>
           </IconButton>
           </div>
         }

        </div>
  );
}
}

DrawerTopContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerTopContainer);