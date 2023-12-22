import {useState} from 'react';

import {Box, Typography, Menu, MenuItem} from '@mui/material';


const Profile = ({account}) => {

    const [open,setOpen] = useState(false);

    const handleClick = (event) =>{
        setOpen(event.currentTarget);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    return (
        <>
           <Box onClick = {handleClick}><Typography>{account}</Typography></Box>
           <Menu
        
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        
      </Menu>
        </>
    )
}

export default Profile;