import React, { Component } from 'react';
import './MainContainer.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import uniqueId from 'react-html-id';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';
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
    inputList : [],
    canvasRefs : {},
    };
  }

  render() {
    const { classes} = this.props;
    // console.log("in main container");
    //console.log("expVariables in canvas", this.props.expVariables);

    return(
      <div className={classes.root}>
      <main className={classNames(classes.content, {[classes.contentShift]: !this.props.open, })}>
        <div className="main-container">
          <div class="container-fluid">
            <div class="row">
              {
                
                
                // this.props.inputList.map((listItem,listIndex) =>{
                                      this.props.storyCardObj.map((item,index) =>{
                                        // console.log("expVariables in canvas",index ,":", this.props.expVariables);
                                        // console.log("expVariables length in canvas", this.props.expVariables.length);
                                        // console.log("scope in canvas", this.props.scope);
                                        // console.log("inputvalue",item);
                                        // console.log("index",index);
                                        if(this.props.storyCardObj.length !== 0) {
                                          return (
                                              (this.props.storyCardObj.length === 1) ?
                                                  (
                                                    <div className="canvas-wrap col-12" >
                                                      <StoryCards 
                                                          index={index} 
                                                          sliderStaus = {item.sliderStaus}
                                                          canvasRefs = {this.state.canvasRefs} 

                                                          sliderExpVariable={item.expVariable}
                                                          sliderExpValue={item.expValue}
                                                          // scope={this.props.scope}
                                                          holdingVar = {this.props.holdingVar}
                                                          // loadCanvasWithRef = {this.props.loadCanvasWithRef()}
                                                          // inputList = {this.props.inputList}
                                                          />
                                                    </div> 
                                                  ) 
                                                  :
                                                  (
                                                    <div className="canvas-wrap col-12 col-sm-12 col-md-6 col-lg-6" > 
                                                      <StoryCards 
                                                          index={index} 

                                                          canvasRefs = {this.state.canvasRefs} 

                                                          // item={item}
                                                          sliderExpVariable={item.expVariable}
                                                          sliderValue={item.expValue}
                                                          // scope={this.props.scope}
                                                          holdingVar = {this.props.holdingVar}
                                                          // loadCanvasWithRef = {this.props.loadCanvasWithRef()}
                                                          // inputList = {this.props.inputList}
                                                          />
                                                    </div> 
                                                  )
                                          ); 
                                        }
                                        { this.props.getCanvasRef(this.state.canvasRefs)}
                                        
                                        { this.props.loadCanvasWithRef(this.canvasRefs['canvas'+this.props.storyCardObj.inputListIndex+index],index)}

                                      })
                                         
                            // })
              }
              {/* {this.props.loadCanvasWithRef()} */}
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
