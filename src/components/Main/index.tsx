import { makeStyles } from "@material-ui/styles";
import { Item } from "../../Item/Item";
import { Header } from "../Header";
import { Box, LinearProgress } from "@mui/material";
import { ProductsType } from "../../App";

export type ProductsType2 = {
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number;
};

export const useStyles = makeStyles({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

type PropsMain = {
  isLoading: boolean;
  data: any;
  handleAddToCart: (clickedItem: ProductsType) => void;
  total?: any;
};

export function Main({ data, isLoading, handleAddToCart, total }: PropsMain) {
  const classes = useStyles();

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Header total={total} />

      <div className={classes.div}>
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplate: "1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr",
            rowGap: "1.2rem",
            columnGap: "1.875rem",
          }}
        >
          {data?.map((item: ProductsType) => (
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          ))}
        </Box>
      </div>
    </>
  );
}
