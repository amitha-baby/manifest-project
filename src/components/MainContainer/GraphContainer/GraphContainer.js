import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plotly from 'plotly.js';
import math from 'mathjs';
import { withStyles } from '@material-ui/core/styles';
import './GraphContainer.css'
import classNames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        
      },
      toolbar: theme.mixins.toolbar,
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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
});

class GraphContainer extends Component {

    state = {
        open: false,
      };

    draw = () => {
        try {
        //   // compile the expression once
           const expression = 2 + 3;//document.getElementById('eq').value
          const expr = math.compile(expression)
    
          // evaluate the expression repeatedly for different values of x
        //   const xValues = window.innerWidth;
        //   const yValues = window.innerHeight; 
    
        const xValues = 600;
        const yValues =600; 

          // render the plot using plotly
          const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
          }
          const data = [trace1]
          Plotly.newPlot('plot', data)
        }
        catch (err) {
          console.error(err)
          alert(err)
        }
      };
    
    
  render() {
    const {classes} = this.props;
    const { open } = this.state;

    var plot = document.getElementById('plot');
  return(
    <div className="container">
    <main>
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        {/* <main className={classes.content}>  */}
            <div className={classes.toolbar} />
            <input type="submit" value="          Graph" onClick={this.draw}/>
            <div id="plot" className="canvas"></div>
         </main> 
    </div>
  );
  }
}

GraphContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(GraphContainer);