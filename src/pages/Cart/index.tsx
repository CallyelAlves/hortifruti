import { Header } from "../../components/Header";
import { CartIem } from "../../components/CartItem";

import { ProductsType } from "../../App";
import { Button, Container, Grid, Typography } from "@mui/material";

type PropsCart = {
  cartItems: ProductsType[];
  addToCart: (clickedItem: ProductsType) => void;
  removeFromCart: (id: number) => void;
  handleRemoveAllItemsCart: () => void;
};

export function Cart({
  cartItems,
  addToCart,
  removeFromCart,
  handleRemoveAllItemsCart,
}: PropsCart) {
  const totalProducts = (items: ProductsType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <>
      <Header total={totalProducts(cartItems)} />

      <Container>
        <Typography variant="h3">Cart</Typography>
        <Typography variant="h6">
          Total Items: {totalProducts(cartItems)}
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{
            border: "none",
            background: "#4E9F3D",
            ":hover": { color: "#4E9F3D", background: "#fff" },
          }}
          onClick={handleRemoveAllItemsCart}
        >
          Remove All
        </Button>
        <Grid container spacing={3} justifyContent="center">
          {cartItems.length === 0 ? (
            <Typography mt={4} variant="h6">
              No items in cart
            </Typography>
          ) : null}
          {cartItems.map((item) => (
            <Grid item xs key={item.id}>
              <CartIem
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
