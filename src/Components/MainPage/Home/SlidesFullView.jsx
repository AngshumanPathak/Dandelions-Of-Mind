import { Box, Typography, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Component = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
`;

const ProductCard = styled(Box)`
  background-color: #ffe4e1;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
  padding: 15px;
  text-align: center;
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ffffff; /* White background on hover */
  }
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Text = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const Price = styled(Typography)`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const SlidesFullView = () => {
    
    const location = useLocation();
    const products = location.state?.products || [];
  return (
   
    <Component>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Image src={product.url} alt={product.title.shortTitle} />
            <Text>{product.title.shortTitle}</Text>
            <Price>Price: ₹{product.price.mrp}</Price>
          </Link>
        </ProductCard>
      ))}
    </Component>
  );
};

export default SlidesFullView;
