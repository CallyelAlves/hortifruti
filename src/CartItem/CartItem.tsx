import { Box, Button } from "@mui/material";
import { ProductsType } from "../App";

type PropsCartItem = {
  item: ProductsType;
  addToCart: (clickedItem: ProductsType) => void;
  removeFromCart: (id: number) => void;
};

export function CartIem({ item, addToCart, removeFromCart }: PropsCartItem) {
  return (
    <Box>
      <h2>{item.name}</h2>
      <div>
        <p>Family: {item.family}</p>
        {/* <p>Total: {(item.amount * item.price).toFixed(2)}</p> */}
      </div>

      <div>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </Box>
  );
}
