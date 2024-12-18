import { Box, Grid, Typography, styled, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import EmptyCart from './EmptyCart';
import { updateCartQuantity, setCartItems } from '../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import useTotalBalance from './hooks/totalBalance';

const Container = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',

  [theme.breakpoints.down('sm')]: {
    padding: '15px 0',
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  border-radius: 5px;
`;

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  margin-right: none;
  color: antiquewhite;
  background: grey;
  width: 250px;
  height: 50px;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,

  [theme.breakpoints.down('sm')]: {
    marginBottom: 15,
  },
}));

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { totalPrice } = useTotalBalance({ cartItems });

  useEffect(() => {
    // Check if user is logged in and cart is available in localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        console.log("Loading cart from localStorage:", savedCart);
        if (Array.isArray(cartData)) {
          dispatch(setCartItems(cartData)); // Set cart items in redux store
        } else {
          console.error('Invalid cart data in localStorage');
        }
      } catch (error) {
        console.error('Error parsing cart data from localStorage', error);
      }
    }
  }, [dispatch]);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem('cart', JSON.stringify(cartItems)); // Store updated cart in localStorage
    }
  }, [cartItems]);

  const handleIncrease = (id, quantity) => {
    dispatch(updateCartQuantity(id, quantity + 1));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantity(id, quantity - 1));
    }
  };

  const generateOrderId = () => {
    return `${Date.now()}`; // Simple orderId using timestamp
  };

  const bundleCartDetails = (items) => {
    const orderId = generateOrderId();

    return {
      orderId,
      items: items.map((item) => ({
        id: item.id,
        name: item.title,
        price: item.price,
        url: item.url,
        quantity: item.quantity,
      })),
      totalPrice: cartItems.reduce((acc, item) => acc + item.price.cost * item.quantity, 0), // Include totalPrice here
    };
  };

  const addAddress = () => {
    const bundledDetails = bundleCartDetails(cartItems);
    console.log('Bundled Cart Details:', bundledDetails);
    navigate('/address', { state: { orderDetails: bundledDetails } });
  };

  return (
    <>
      {cartItems.length ? (
        <Container container>
          <LeftComponent item lg={8} md={8} sm={12} xs={12}>
            <Header>
              <Typography>My Cart({cartItems.length})</Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => handleIncrease(item.id, item.quantity)}
                onDecrease={() => handleDecrease(item.id, item.quantity)}
              />
            ))}

            <ButtonWrapper>
              <StyledButton onClick={() => addAddress()}>Place Order</StyledButton>
            </ButtonWrapper>
          </LeftComponent>

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
