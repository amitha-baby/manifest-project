import React,{Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
    
class Expression extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latex: '',
    }
  }

 change(index,e,id) {
  this.props.changeInput(index,e,id);
 }

  render() {
    const deleteButton = (
      <IconButton > 
        <Icon>
          clear
        </Icon>
      </IconButton>
    )

  return(    
    this.props.inputList.map((item, index) => {
      return <div className="input-container">
        <div class="container-fluid">
          <div class="row">
            <div className="col-9" >
              <input 
                type="text" 
                id="text-field" 
                key={item.id}
                ref="inputValue"
                placeholder="Enter Input"
                value = {item.inputValue}
                onKeyPress={(event) =>this.props.handleKeyPressEnter(event)}
                onChange={(event) =>this.change(index,event,item.inputValueId)}
                autoFocus
              />

              <MathQuill
                type="text" 
                id="text-field" 
                latex = {this.state.latex}
                onChange = {event => this.change(index,event,item.inputValueId)}
                autoFocus
              />  

            </div>
            <div className="col-2" >
              <div 
                  className="delete-btn-wrap" 
                  onClick={(event) => this.props.deleteInput(index,event,item.inputValueId)}>
                  {deleteButton}
              </div>
            </div>
          </div>
        </div>
      <Divider />
      </div> 
      })
  );
  }
}     
 
export default(Expression);