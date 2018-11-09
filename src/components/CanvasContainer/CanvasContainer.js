import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './CanvasContainer.css';

var canvas = document.getElementById('main');
var c = canvas.getContext('2d');

const drawerWidth = 240;

const styles = theme => ({
content: {
  flexGrow: 1,
  padding: theme.spacing.unit * 3,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: drawerWidth,
},
contentShift: {
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
},
});

class CanvasContainer extends Component {
  constructor(props){
    super(props);
    // console.log("object Array is :", JSON.stringify(this.props.objArray));
  }

  componentWillMount(){
    console.log(this.props.objArray);
    c.beginPath();
    c.strokeRect(300,100,1000,600);
    c.fillText(this.props.objArray[1].inputValue, 800,400);
  }

  componentDidUpdate(prevProps) {
    if (this.props.objArray !== prevProps.objArray) {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.beginPath();
      c.strokeRect(300,100,1000,600);
  
      // this.props.objArray.map((item,index) =>{
      //     c.fillText(item.inputValue, 800,400);
      // });

      c.fillText(this.props.objArray[1].inputValue, 800,400);
    }
  }

  render() {
    const { classes, theme } = this.props;
  return(
    <div>
      <main
          className={classNames(classes.content, {
            [classes.contentShift]: !this.props.open,
          })}
        >
    {
       this.props.objArray.map((item,index) =>{
        return (
        <div>
          {item.inputValue}
        </div>
        );
      })
    }
    </main>
    </div>
  );
  }
}

CanvasContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CanvasContainer);