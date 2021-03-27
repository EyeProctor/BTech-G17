import React from 'react';
import {Button, Dialog, DialogActions, DialogTitle, Slide, IconButton, Menu, MenuItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

const ProfileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
    handleClose(null);
  };

  const handleDClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <IconButton aria-label="profile" onClick={handleClick} style={{marginRight:'10px',height:'50px',width:'50px'}}>
            <AccountCircleIcon fontSize='large' />
        </IconButton>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to log out?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDClose} color="default">
                    Confirm
                </Button>
                <Button onClick={handleDClose} color="default">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        
        <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleOpen}>
            <ListItemIcon>
                <ExitToAppIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Logout"/>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

export default ProfileMenu;