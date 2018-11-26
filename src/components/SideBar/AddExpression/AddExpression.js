import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';   
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import '../SideBar.css';

const styles = theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        opacity:0.9,
      },
});
    
class AddExpression extends Component {

    constructor(props) {
      super(props);
    }
    
  render() {
    const { classes, theme } = this.props;
    return(    
    <div className={classes.drawerHeader}>
        <IconButton> 
        <Icon onClick={this.props.handleClickNewButton}>
          add
        </Icon>
        </IconButton>
        <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </div>
    );
  }

}
AddExpression.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddExpression);

  