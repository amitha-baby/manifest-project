import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Icon from '@material-ui/core/Icon';
import './SideBar.css';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    transition: 0.5,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    opacity:0.9,
},
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  icon: {
    margin: theme.spacing.unit * 1,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countField: 0,
    }
  }

  componentDidMount() {
    this.setState((state, props) => ({
        counter: state.countField + props.countField
    }));
  }

  render() {
    const { classes, theme } = this.props;

    const deleteItem = (
      <IconButton > 
        <Icon className="delete-button delete-hover" onClick={this.props.deleteEvent}>
          clear
        </Icon>
      </IconButton>
  )

    return (
      <div> 
        <Drawer
          className={classes.drawer}
          id="side-nav"
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton> 
              <Icon className={classes.icon} onClick={this.props.handleClick}>
                add
              </Icon>
            </IconButton>
            <IconButton id="chevron-button" 
                onClick={this.props.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {
            this.props.arrayvar.map((item, index) => (
              <div className="input-container">
                <form className="form-inline" ref="inputForm">
                    <div className="form-group">
                    {/* <div className="input-countfield" >  {this.counter} </div> */}
                    <div className="input-div-container">
                        <input 
                            type="text" 
                            id="text-field" 
                            key={item.id}
                            ref="inputValue"
                            placeholder="Enter Note"
                            value={item.inputVal}
                            // {this.props.deleteInput(index)}
                            onChange={(event) => this.props.changeValue(index,event)} 
                        /> 
                    </div>
                    </div>
                </form>
                <div>  
                  {deleteItem}  
                </div>
              </div>    
          ))}
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideBar);


