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
    width: drawerWidth,
    flexShrink: 0,
    transition: 0.5,
  },
  drawerPaper: {
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
    // const deleteButton = (
    //   <IconButton > 
    //     <Icon>
    //       clear
    //     </Icon>
    //   </IconButton>
    // )

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
          {/* {
            this.state.inputList.map((item, index) => {
              return <div className="input-container"> */}
                <Expression inputList = {this.state.inputList}
                            deleteInput = {this.props.deleteInput} 
                            handleKeyPressEnter = {this.props.handleKeyPressEnter}
                            changeInput = {this.props.changeInput}  />
                      {/* <div className="input-div-container">
                          <input 
                              type="text" 
                              className="input-text-field"
                              id="text-field" 
                              key={item.id}
                              ref="inputValue"
                              placeholder="Enter Input"
                              value={item.inputValue}
                              onKeyPress={(event) =>this.props.handleKeyPressEnter(event)}
                              onChange={(event) => this.props.changeInput(index,event)}  
                          /> 
                      </div>
                      <div className="delete-btn-wrap" onClick={() => this.props.deleteInput(index)}>
                        {deleteButton}
                      </div> */}
                    {/* </div>    
          })} */}
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

