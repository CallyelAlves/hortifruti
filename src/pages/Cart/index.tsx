import { Header } from "../../components/Header";
import { CartIem } from "../../CartItem/CartItem";

import { Box } from "@mui/system";
import { ProductsType } from "../../App";

type PropsCart = {
  cartItems: ProductsType[];
  addToCart: (clickedItem: ProductsType) => void;
  removeFromCart: (id: number) => void;
};

export function Cart({ cartItems, addToCart, removeFromCart }: PropsCart) {
  const totalProducts = (items: ProductsType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <>
      <Header total={totalProducts(cartItems)} />
      <Box>
        <h2>Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map((item) => (
          <CartIem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h3>Total Items: {totalProducts(cartItems)}</h3>
      </Box>
    </>
  );
}
