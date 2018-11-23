import React, { Component } from 'react';
import './CanvasContainer.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputRange from 'react-input-range';
import uniqueId from 'react-html-id';
import 'react-input-range/lib/css/index.css';
import ReactDOM from 'react-dom';

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
    uniqueId.enableUniqueIds(this);

    this.canvasRefs = {};
    this.sliderRefs ={};
    this.state = {
    value: 0,
    sliderValue: [],
    inputList : []
    };
  }

  // componentDidMount() {
  //   this.setState((state, props) => ({
  //       counter: state.countField + props.countField,
  //       inputList : this.props.inputList
  //   }));
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.inputList !== prevProps.inputList) {
  //     this.setState({
  //       inputList : this.props.inputList
  //     }, 
  //     ()=> {
  //       console.log("hello");
  //       console.log("hello", this.state.inputList);
  //     });
  //   }
  // }

  
  editCanvas(index,value) {
    console.log("`canvas${index}`" , `canvas${index}`);
    const canvas = ReactDOM.findDOMNode(this.canvasRefs[`canvas${index}`]);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var result = this.handleInputExpression(value);
    ctx.font = "normal 15px sans-serif";
    ctx.textAlign='center';
    ctx.fillText(result, (canvas.width)/2,(canvas.height)/2);

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
                this.props.inputList.map((item,index) =>{
                  return (
                    (this.props.inputList.length === 1) ?
                      (
                        <div className="canvas-wrap col-12" >
                          <div className="row">
                            <div className="col-12">
                              <canvas className="canvas-container" ref={(ref) => this.canvasRefs[`canvas${index}`] = ref}/>
                              {/* {console.log("this.ref", this.refs['canvas0'])} */}
                              {/* { this.editCanvas(index,item.inputValue)} */}
                            </div>
                          </div>
                          <div className="slider-field row">
                            <div className="col-9">
                              <InputRange 
                                ref={(ref) => this.sliderRefs[`slider${index}`] = ref}
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
                              <canvas className="canvas-container" ref={(ref) => this.canvasRefs[`canvas${index}`] = ref}/>
                              {/* {this.canvasRefs = this.refs['canvas'+index]} */}


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
                                ref={(ref) => this.sliderRefs[`slider${index}`] = ref}
                                step={1}
                                maxValue={10}
                                minValue={-10}
                                value={this.state.value}
                                // onChange={
                                  // {value => this.setState({ 
                                  //   sliderValue:[...this.state.sliderValue, {id:index, value: value}]},
                                  //   () => { console.log("vcbgcvb",this.state.sliderValue);
                                  // }
                                // )}

                                onChange={value => this.setState({ value })}

                                onChangeComplete={value => this.setState({ 
                                    sliderValue:[...this.state.sliderValue, {a: value}]},
                                    () => { console.log("vcbgcvb",this.state.sliderValue);})
                            }
                              />
                            </div>
                            <div className="col-2 offset-1">
                              <div>
                             a={this.state.value}</div>
                            </div>
                          </div>
                        </div>

                      )
                    );
                  }
                 
                  )
                }
                 { this.props.getCanvasRef(this.canvasRefs)}
                 { this.props.getSliderRef(this.sliderRefs)}

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




