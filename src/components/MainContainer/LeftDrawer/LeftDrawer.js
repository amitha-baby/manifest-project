// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Divider from '@material-ui/core/Divider';
// import AddButton from './AddButton/AddButton';
// import IconButton from '@material-ui/core/IconButton';
// import Icon from '@material-ui/core/Icon';
// import './LeftDrawer.css';

// const drawerWidth = 270;

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   drawer: {
//     [theme.breakpoints.up('sm')]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   menuButton: {
//     marginRight: 20,
//     [theme.breakpoints.up('sm')]: {
//       display: 'none',
//     },
//   },
//   toolbar: theme.mixins.toolbar,
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing.unit * 3,
//   },
//   button: {
//     margin: theme.spacing.unit,
//   },
// });

// class SideBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { mobileOpen: true,
//       left : true,};
//       this.handleDrawerToggle=this.handleDrawerToggle.bind(this);
//       this.handleClick = this.handleClick.bind(this);
// }

//   handleClick = () => {
//     this.setState({ mobileOpen: false });
//   };

//   handleDrawerToggle = () => {
//     console.log("this.state.mobileOpen",this.state.mobileOpen)
//     this.setState({ mobileOpen: !this.state.mobileOpen });
//   };
  
//   render() {
//     const { classes, theme } = this.props;
//     const drawer = (
//       <div>
//         <div>
//           {/* <DrawerTopContainer /> */}
//           <Divider />
//         </div>    
//         <div>
//           {/* <DrawerContents /> */}
//         </div>    
//       </div> 



// // {/*          
// //  <div className="addBtn">
// //    <div className="topContainer"> 
          
// //        <AddButton />
// //        <div className="sidebar-container">
// //          <IconButton>
// //            <Icon onClick={this.handleDrawerToggle}>
// //               chevron_left
// //             </Icon>
// //         </IconButton>
// //     </div> 
// //  </div>  
// //     <Divider />
// //   </div>
// //  </div>  */}

//     );

//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} >
//             <div
//                         tabIndex={0}
//                         role="button"
//                         onClick={this.toggleDrawer('left', true)}
//                         onKeyDown={this.toggleDrawer('left', true)}
//                     >
//                         {drawer}
//                     </div>
//                 </Drawer> */}

// {console.log("this.state.mobileOpen",this.state.mobileOpen)}

//             {/* {(this.state.mobileOpen) && */}
//             <div>
//               <Drawer
//               container={this.props.container}
//               variant="temporary"
//               anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//               open={this.state.mobileOpen}
//               onClose={this.handleClick}
//               classes={{
//                 paper: classes.drawerPaper,
//               }}
//               ModalProps={{
//                 keepMounted: true, 
//               }}
//             >
//               {drawer}
//             </Drawer>
//             </div>
//           {/* } */}

//          {/* {(this.state.mobileOpen === false) &&
//            <div className="sidebar-container-right">
//            <IconButton>
//                <Icon onClick={this.handleDrawerToggle}>
//                  chevron_right
//                </Icon>
//            </IconButton>
//            </div>
//          } */}
            
//       </div>
//     );
//   }
// }

// SideBar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles, { withTheme: true })(SideBar);















import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DrawerTopContainer from './DrawerTopContainer/DrawerTopContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
});

function LeftDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="permanent">
        <div className={classes.toolbar} />
          <div>
            <DrawerTopContainer />
          </div>
      </Drawer>
    </div>
  );
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftDrawer);