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
import InputDiv from '../InputDiv/InputDiv';

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
    this.state = {countField: 0, arrayvar : []};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(
      { countField: this.state.countField + 1 ,
        arrayvar: [...this.state.arrayvar, {id : "",
           value :"Enter Note"}]
      },
        () => {
            console.log("Array After updation is : ", this.state.arrayvar)
        })
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div 
      // className="side-nav"
      >
        
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
                <Icon className={classes.icon} 
                  onClick={this.handleClick}
                >
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
            this.state.arrayvar.map((item, index) => (
            <InputDiv 
              inputArray={this.state.arrayvar} 
              count={this.state.countField}
              value={this.state.arrayvar.value}
            />
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


