import { makeStyles } from "@material-ui/styles";
import { Item } from "../../components/Item";
import { Header } from "../../components/Header";
import { Grid, LinearProgress } from "@mui/material";
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

type PropsHome = {
  isLoading: boolean;
  data: ProductsType[] | undefined;
  handleAddToCart: (clickedItem: ProductsType) => void;
  total?: number;
};

export function Home({ data, isLoading, handleAddToCart, total }: PropsHome) {
  const classes = useStyles();

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Header total={total} />

      <div className={classes.div}>
        <Grid container spacing={4.5} mt={0.5} justifyContent="center">
          {data?.map((item: ProductsType) => (
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          ))}
        </Grid>
      </div>
    </>
  );
}
