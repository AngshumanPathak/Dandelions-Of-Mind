import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, styled } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { saveCartToBackend } from '../../service/api';

const Component = styled(Menu)`
  margin-top: 5px;
`;

const Logout = styled(Typography)`
  font-size: 14px;
  margin-left: 10px;
`;

const MenuItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Orders = styled(Typography)`
  font-size: 14px;
  margin-left: 10px;
`

const Profile = ({ account, setAccount, setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutUser = async () => {
    try {
      
      await saveCartToBackend();
  
      
      setAccount('');
      setIsLoggedIn(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('cart');
      
  
      
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navigateOrders = () => {

    navigate('/orders');
  }

  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ cursor: 'pointer', marginRight: '10px', marginTop: '5px' }}>
          {account}
        </Typography>
      </Box>

      <Component anchorEl={open} open={Boolean(open)} onClose={handleClose}>
      <MenuItem onClick={() => { navigateOrders(); handleClose(); }}>
          <Box display="flex" alignItems="center" margin={'10px'}>
            <ShoppingBagIcon color="primary" fontSize="small" />
            <Orders>Orders</Orders>
          </Box>
        </MenuItem>

        <MenuItem onClick={() => { logoutUser(); handleClose(); }}>
          <Box display="flex" alignItems="center" margin={'10px'}>
            <PowerSettingsNewIcon color="primary" fontSize="small" />
            <Logout>Logout</Logout>
          </Box>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
