import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "react-query";
import { Route, Routes as RoutesReact } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

export type ProductsType = {
  id: number;
  name: string;
  family: string;
  nutritions: {
    calories: number;
    carbohydrates?: number;
    fat?: number;
    protein?: number;
    sugar?: number;
  };
  amount: number;
};

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.fruityvice.com/api/fruit/all";

const getProducts = async (): Promise<ProductsType[]> =>
  await (await fetch(proxy + url)).json();

function App() {
  const [cartItems, setCartItems] = useState<ProductsType[]>([]);

  const { data, isLoading, error } = useQuery<ProductsType[]>(
    "products",
    getProducts,
    {
      staleTime: 7200000, // 2 horas
    }
  );

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    );
  }

  console.log(data);

  function getTotalItems(items: ProductsType[]) {
    return items.reduce((acc: number, items) => acc + items.amount, 0);
  }

  function handleAddToCart(clickedItem: ProductsType) {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  }

  function handleRemoveFromCart(id: number) {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        }
        return [...acc, item];
      }, [] as ProductsType[])
    );
  }

  function handleRemoveAllItems() {
    setCartItems([]);
  }

  return (
    <BrowserRouter>
      <RoutesReact>
        <Route
          element={
            <Home
              data={data}
              isLoading={isLoading}
              handleAddToCart={handleAddToCart}
              total={getTotalItems(cartItems)}
            />
          }
          path="/"
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              handleRemoveAllItems={handleRemoveAllItems}
            />
          }
        />
      </RoutesReact>
    </BrowserRouter>
  );
}

export default App;
