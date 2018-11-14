import React,{Component} from 'react';
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
  icon: {
    margin: theme.spacing.unit * 1,
  },
});

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countField: 0,
      inputArray : []
    }
  }

  componentDidMount() {
    this.setState((state, props) => ({
        counter: state.countField + props.countField,
        inputArray : this.props.arrayvar
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.arrayvar !== prevProps.arrayvar) {
      console.log(this.props.arrayvar);
      this.setState({
        inputArray : this.props.arrayvar
      });

    }
  }

  render() {
    const { classes, theme } = this.props;
    const deleteButton = (
      <IconButton > 
        <Icon className="delete-button delete-hover">
          clear
        </Icon>
      </IconButton>
    )

    const drawerTopContainer = (
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
    )

      
    return (
      <div> 
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawerTopContainer}
          <Divider />
          {
            this.state.inputArray.map((item, index) => {return <div className="input-container">
                    
                    <div className="input-div-container">
                        <input 
                            type="text" 
                            id="text-field" 
                            key={item.id}
                            ref="inputValue"
                            placeholder="Enter Input"
                            value={item.inputValue}
                            onChange={(event) => this.props.changeValue(index,event)} 
                        /> 
                    </div>

                    <div className="delete-btn-wrap" onClick={() => this.props.deleteInput(index)}>
                      {deleteButton}  
                </div>
              </div>    
          })}
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


