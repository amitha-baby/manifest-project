import React,{Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
    
class Expression extends Component {
    constructor(props) {
      super(props);
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
                <div className="input-div-container">
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
                </div>
            </div>
            })
    );
  }
}     
 
export default(Expression);