import React, { Component } from 'react';
import './CanvasContainer.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

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
  constructor(props) {
    super(props);
    this.state = {
    value: 0,
    sliderValue :[1,2,3,4]
    };
  }

  render() {
    const { classes} = this.props;

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
                  this.props.inputList.map((item,index) =>{
                    return (
                      (this.props.inputList.length === 1) ?
                        (
                          <div className="canvas-wrap col-12" >
                            <div className="row">
                              <div className="col-12">
                              <canvas className="canvas-container" ></canvas>
                            </div>
                            </div>

                            <div className="slider-field row">
                                <div className="col-9">
                                  <InputRange
                                    step={1}
                                    maxValue={10}
                                    minValue={-10}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}
                                    onChangeComplete={value => console.log(value)} />
                                </div>
                                <div className="col-2 offset-1">
                                    <div>a={this.state.value}</div>
                                </div>
                              </div>
                          </div>
                        ) : 
                        (
                          <div className="canvas-wrap col-12 col-sm-12 col-md-6 col-lg-6" >
                          <div className="row">
                              <div className="col-12">
                                <canvas className="canvas-container" ></canvas>
                              </div>
                              </div>

                              {/* <div className="slider-field row"> */}
                                {/* <div className="col-9"> */}
                                  {/* <InputRange */}
                                    {/* step={1} */}
                                    {/* maxValue={10} */}
                                    {/* minValue={-10} */}
                                    {/* value={this.state.sliderValue[index]} */}
                                    {/* // onChange={value => this.setState({ this.state.sliderValue[index].value })} */}
                                    {/* onChange={value=>  this.setState( {   */}
                                      {/* sliderValue:[{...this.state.sliderValue, [index]:  value}] */}
                                       {/* }, */}
                                       {/* () => { console.log("vcbgcvb",this.state.sliderValue[0]); */}
                                              {/* console.log("dfgdfgdfg",this.state.sliderValue[1]); */}
                                      {/* })} */}
                                   {/* / */}
                                    {/* // onChangeComplete={value => this.setState( {   */}
                                    {/* //   sliderValue:[{...this.state.sliderValue, [index]:  value}]})} */}
                                      {/* /> */}
                                {/* </div> */}
                                {/* <div className="col-2 offset-1"> */}
                                    {/* <div> */}
                                      {/* a={this.state.value} */}
                                    {/* {this.props.expValueHoldingVariable(item.inputValue)} */}
                                    {/* </div> */}
                                {/* </div> */}
                              {/* </div> */}

                              
                            <div className="slider-field row">
                                <div className="col-9">
                                  <InputRange
                                    step={1}
                                    maxValue={10}
                                    minValue={-10}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}
                                    onChangeComplete={value => console.log(value)} />
                                </div>
                                <div className="col-2 offset-1">
                                    <div>a={this.state.value}</div>
                                </div>
                              </div>

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




