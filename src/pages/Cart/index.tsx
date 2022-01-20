import { Header } from "../../components/Header";
import { CartIem } from "../../components/CartItem";

import { ProductsType } from "../../App";
import { Button, Container, Typography } from "@mui/material";

type PropsCart = {
  cartItems: ProductsType[];
  addToCart: (clickedItem: ProductsType) => void;
  removeFromCart: (id: number) => void;
  handleRemoveAllItems: () => void;
};

export function Cart({
  cartItems,
  addToCart,
  removeFromCart,
  handleRemoveAllItems,
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
          onClick={handleRemoveAllItems}
        >
          Remove All
        </Button>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {cartItems.length === 0 ? (
            <Typography variant="h6">No items in cart</Typography>
          ) : null}
          {cartItems.map((item) => (
            <CartIem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}
        </Container>
      </Container>
    </>
  );
}
