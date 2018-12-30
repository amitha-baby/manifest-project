import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import './SideBar.css';
import AddExpression from './AddExpression/AddExpression';
import Expression from './Expression/Expression';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    marginTop:64,
    width: drawerWidth,
    flexShrink: 0,
    transition: 0.5,
  },
  drawerPaper: {
    marginTop:64,
    width: drawerWidth,
  },
});

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countField: 0,
      inputList : []
    }
  }

  componentDidMount() {
    this.setState((state, props) => ({
        counter: state.countField + props.countField,
        inputList : this.props.inputList
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.inputList !== prevProps.inputList) {
      this.setState({
        inputList : this.props.inputList
      });
    }
  }

  render() {
    const { classes, theme } = this.props;
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
          <AddExpression handleDrawerClose = {this.props.handleDrawerClose} handleClickNewButton = {this.props.handleClickNewButton}/>
          <Divider />
            <Expression inputList = {this.state.inputList}
                        deleteInput = {this.props.deleteInput} 
                        textfun = {this.props.textfun}
                        handleKeyPressEnter = {this.props.handleKeyPressEnter}
                        changeInput = {this.props.changeInput}  />
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

