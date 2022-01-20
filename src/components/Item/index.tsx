import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useStyles } from "../../pages/Home";
import { ProductsType } from "../../App";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

type PropsType = {
  item: ProductsType;
  handleAddToCart: (clickedItem: ProductsType) => void;
};

export function Item({ item, handleAddToCart }: PropsType) {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  return (
    <Grid item xs="auto">
      <Card sx={{ width: 260, height: 220 }}>
        <CardContent>
          <Typography variant="h5" component="div" textAlign={"center"}>
            {item.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Family: <strong>{item.family}</strong>
          </Typography>
          <Typography variant="body2">
            Calories: <strong>{item.nutritions.calories}</strong>
          </Typography>
        </CardContent>
        <CardActions className={classes.div}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              border: "1px solid ",
              fontWeight: "bold",
              transition: ".3s",
              ":hover": { background: "#4E9F3D", color: "#fff" },
            }}
            endIcon={<AddShoppingCartIcon />}
            size="small"
            onClick={() => {
              handleAddToCart(item);
              setCount(count + 1);
            }}
          >
            {count > 0 ? `Add to Cart (${count})` : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
