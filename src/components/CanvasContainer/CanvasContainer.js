import React, { Component } from 'react';
import './CanvasContainer.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
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
  state = {
    open: true,
  };

  constructor(props){
    super(props);
  }

  render() {
    const { classes} = this.props;
    const { open } = this.state;
    return(
      <div className={classes.root}>
      <main
            className={classNames(classes.content, {
              [classes.contentShift]: !this.props.open,
            })}
          >
        <div className="main-container">
          <div class="container-fluid">
            <div class="row">
                {
                  this.props.objArray.map((item,index) =>{
                    return (
                      (this.props.objArray.length === 1) ?
                        (
                          <div className="canvas-wrap col-12" >
                            <canvas className="canvas-container" ></canvas>
                          </div>
                        ) : 
                        (
                          <div className="canvas-wrap col-12 col-sm-12 col-md-6 col-lg-6" >
                            <canvas className="canvas-container" ></canvas>
                          </div>
                        )
                    );
                  })
                }
              </div>
          </div>
        </div>
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




