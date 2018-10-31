import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const navBarLeftMargin = 0;

const styles =  theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  spec: {
    marginLeft: navBarLeftMargin,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${navBarLeftMargin}px)`,
    },
  },
});

class NavBar extends Component {
  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.spec}>
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              Manifest
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);