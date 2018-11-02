


// import React from 'react';
// import PropTypes from 'prop-types';
// import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
// import { withStyles } from '@material-ui/core/styles';
// import './DrawerTopContainer.css'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import Divider from '@material-ui/core/Divider';
// // import DrawerContents from './LeftDrawer/DrawerContents/DrawerContents';

// const drawerWidth = 240;

// const styles = theme => ({
//     icon: {
//         margin: theme.spacing.unit * 1,
//       },
//       drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//       },
//       drawerPaper: {
//         width: drawerWidth,
//       },
//       toolbar: theme.mixins.toolbar,
// });

// class DrawerTopContainer extends React.Component {
     
//     constructor(props) {
//         super(props);
//         this.state = { slideLeft: true};
//         this.handleDrawerToggle=this.handleDrawerToggle.bind(this);
//         this.handleClick = this.handleClick.bind(this);
//     }
    
//     handleClick = () => {
//         this.setState({ slideLeft: false });
//     };        

//     handleDrawerToggle = () => {
//         this.setState({ slideLeft: !this.state.slideLeft });
//     };

//     render() {
//     const { classes} = this.props;
//     const drawer = (
//         <div>
//         <IconButton className="addButton-container"> 
//             <Icon className={classes.icon} onClick={this.handleClick}>
//                 add
//             </Icon>
//         </IconButton>
//         <CssBaseline />
//         <IconButton className="slidebar-chevron-left"> 
//             <Icon className={classes.icon} onClick={this.handleDrawerToggle} >
//                 chevron_left
//             </Icon>
//         </IconButton>
//         <Divider />
//     </div>
//     );
//     return(
//         <div className={classes.root}>
//         {/* {(this.state.slideLeft) && */}
//             <div>
//                 <Drawer
//                     className={classes.drawer}
//                     container={this.props.container}
//                     variant="temporary"
//                     open={this.state.slideLeft}
//                     onClose={this.handleClick}
//                     classes={{
//                         paper: classes.drawerPaper,
//                     }}
//                     ModalProps={{
//                     keepMounted: true, 
//                     }}
//                 >
//                 {drawer}
//                 </Drawer>
//             </div>
//         {/* } */}

//         {/* {(this.state.slideLeft === false) &&
//            <div className="sidebar-container-right">
//            <IconButton>
//                <Icon onClick={this.handleDrawerToggle}>
//                  chevron_right
//                </Icon>
//            </IconButton>
//            </div>
//          } */}

//         </div>
//   );
// }
// }

// DrawerTopContainer.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DrawerTopContainer);











import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AddButton from './AddButton/AddButton';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});


class DrawerTopContainer extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = { slideLeft: true};
        this.handleDrawerToggle=this.handleDrawerToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
            
    handleClick = () => {
        this.setState({ slideLeft: false });
    };        
        
    handleDrawerToggle = () => {
        this.setState({ slideLeft: !this.state.slideLeft });
    };

    render() {
        const { classes} = this.props;
        const drawer = (
            <div>
                {/* <IconButton className="addButton-container"> 
                    <Icon className={classes.icon} onClick={this.handleClick}>
                        add
                    </Icon>
                </IconButton> */}
                <AddButton />
                <CssBaseline />
                <IconButton className="slidebar-chevron-left"> 
                    <Icon className={classes.icon} onClick={this.handleDrawerToggle} >
                        chevron_left
                    </Icon>
                </IconButton>
                <Divider />
            </div>
        );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          container={this.props.container}
          open={this.state.slideLeft}
          onClose={this.handleClick}
          ModalProps={{
            keepMounted: true, 
          }}
        >
        {/* <div className={classes.toolbar} /> */}
        {drawer}
        <Divider />
        </Drawer>

        {(this.state.slideLeft === false) &&
           <div className="sidebar-container-right">
           <IconButton>
               <Icon onClick={this.handleDrawerToggle}>
                 chevron_right
               </Icon>
           </IconButton>
           </div>
         }
        </div>
        );
        }
}

DrawerTopContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerTopContainer);