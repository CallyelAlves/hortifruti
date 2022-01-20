import { Box, Button, Typography } from "@mui/material";
import { ProductsType } from "../../App";

type PropsCartItem = {
  item: ProductsType;
  addToCart: (clickedItem: ProductsType) => void;
  removeFromCart: (id: number) => void;
};

export function CartIem({ item, addToCart, removeFromCart }: PropsCartItem) {
  return (
    <Box
      sx={{
        width: "320px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
        padding: 4,
        borderRadius: "5px",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h4">{item.name}</Typography>
      <Box margin={2}>
        <Typography variant="body1">Family: {item.family}</Typography>
        <Typography variant="body1">
          Calories: {item.nutritions.calories}
        </Typography>
        <Typography variant="body1">
          Carbohydrates: {item.nutritions.carbohydrates}
        </Typography>
        <Typography variant="body1">Fat: {item.nutritions.fat}</Typography>
        <Typography variant="body1">
          Protein: {item.nutritions.protein}
        </Typography>
        <Typography variant="body1">Sugar: {item.nutritions.sugar}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h5">Quantity:</Typography>
        <Button
          size="small"
          disableElevation
          variant="contained"
          color="error"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <Typography fontWeight="bold" variant="body1">
          {item.amount}
        </Typography>
        <Button
          size="small"
          disableElevation
          variant="contained"
          color="success"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}
