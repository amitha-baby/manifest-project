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
    console.log("object Array is :", JSON.stringify(this.props.objArray));
  }

  componentWillMount(){
    console.log(this.props.objArray);
    c.beginPath();
    c.strokeRect(400,100,1000,600);
  }

   singleEntry(str) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.strokeRect(400,100,1000,600);
    c.fillText(str, 800,400);
  }

  doubleEntry() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.strokeRect(400,30,1000,350);
    c.fillText(this.props.objArray[0].inputValue, 800,200);

    c.beginPath();
    c.strokeRect(400,410,1000,350);
    c.fillText(this.props.objArray[1].inputValue, 800,600);
  }

  multipleEntrys() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.strokeRect(300,30,600,350);
    c.strokeRect(930,30,600,350);
    c.strokeRect(300,410,600,350);
    c.strokeRect(930,410,600,350);
    this.props.objArray.map((item,index) =>{
      // c.fillText(this.props.objArray[index].inputValue, 800,600);
      console.log(this.props.objArray[index].inputValue);
    });
  }

  componentDidUpdate() {
      var values = {};
      var regex1 = RegExp('[a-z]+');
      var str1 = this.props.objArray[0].inputValue;

      if(regex1.test(str1) === false)
        {
          this.singleEntry(str1);
        }
        else 
        {
          var regex2 = RegExp('[0-9]+','g');
          var s1, s2;
          s1 = regex1.exec(str1)
          console.log(`Found ${s1}. Next starts at ${regex1.lastIndex}.`);
          s2 = regex2.exec(str1)
          console.log(`Found ${s2}. Next starts at ${regex2.lastIndex}.`);
          values[s1] = s2;
          // console.log((values[s1])); 
          this.singleEntry(values[s1]);
        }
      
      if((this.props.objArray.length) === 2) {
        this.doubleEntry();
      }

      if((this.props.objArray.length) > 2 ) {
        this.multipleEntrys();
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
              {/* {item.inputValue} */}
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