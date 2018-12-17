import React, { Component } from 'react';
import './MainContainer.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import uniqueId from 'react-html-id';
import 'react-input-range/lib/css/index.css';
import StoryCards from './StoryCards/StoryCards';

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


class MainContainer extends Component {
  constructor(props) {
    super(props);
    uniqueId.enableUniqueIds(this);
    this.state = {
    value: 0,
    canvasRefs : {},
  }
}

  render() {
    const { classes} = this.props;
    return(
      <div className={classes.root}>
        <main className={classNames(classes.content, {[classes.contentShift]: !this.props.open, })}>
          <div className="main-container">
            <div class="container-fluid">
              <div class="row">
                {
                  this.props.storyCardObj.map((item,index) =>{
                    if(this.props.storyCardObj.length !== 0) {
                      return (
                        (this.props.storyCardObj.length === 1) ?
                          (
                            <div className="canvas-wrap col-12" >
                              <StoryCards 
                                  index={index}
                                  scope = {this.props.scope}
                                  sliderStatus = {item.sliderStatus}
                                  sliderExpVariable={item.expVariable}
                                  sliderExpValue={item.expValue}
                                  loadCanvas = {this.props.loadCanvas}
                                  updateScope = {this.props.updateScope}
                                  sliderMinValue = {item.sliderMinValue}
                                  sliderMaxValue = {item.sliderMaxValue}
                                  sliderMaxOnClick = {this.props.sliderMaxOnClick}
                                  onKeyPressSliderMaxValue ={this.props.onKeyPressSliderMaxValue}
                              />
                            </div> 
                          ) 
                          :
                          (
                            <div className="canvas-wrap col-12 col-sm-12 col-md-6 col-lg-6" > 
                              <StoryCards 
                                  index={index}  
                                  scope = {this.props.scope}
                                  sliderStatus = {item.sliderStatus}
                                  sliderExpVariable={item.expVariable}
                                  sliderExpValue={item.expValue}
                                  loadCanvas = {this.props.loadCanvas}
                                  updateScope = {this.props.updateScope}
                                  sliderMinValue = {item.sliderMinValue}
                                  sliderMaxValue = {item.sliderMaxValue}
                                  sliderMaxOnClick = {this.props.sliderMaxOnClick}
                                  onKeyPressSliderMaxValue ={this.props.onKeyPressSliderMaxValue}
                                  changeSliderMaxValue = {this.props.changeSliderMaxValue}
                              />
                            </div> 
                          )
                      ); 
                    }
                    // { this.props.getCanvasRef(this.state.canvasRefs)}
                    // { this.props.loadCanvasWithRef(this.canvasRefs['canvas'+this.props.storyCardObj.inputListIndex+index],index)}
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

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainContainer);
