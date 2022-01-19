import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "react-query";
import { Route, Routes as RoutesReact } from "react-router-dom";
import { Main } from "./components/Main";
import { Cart } from "./pages/Cart";
import { useState } from "react";

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.fruityvice.com/api/fruit/all";

export type ProductsType = {
  id: number;
  name: string;
  family: string;
  nutritions: {
    calories: number;
  };
  amount: number;
};

const getProducts = async (): Promise<ProductsType[]> =>
  await (await fetch(proxy + url)).json();

function App() {
  const [cartItems, setCartItems] = useState([] as ProductsType[]);

  const { data, isLoading, error } = useQuery<ProductsType[]>(
    "products",
    getProducts,
    {
      staleTime: 7200000, // 2 horas
    }
  );

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

  /*   <Badge badgeContent={getTotalItems(cartItems)}>
    <AddShoppingCartIcon />
</Badge> */

  return (
    <BrowserRouter>
      <RoutesReact>
        <Route
          element={
            <Main
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
            />
          }
        />
      </RoutesReact>
    </BrowserRouter>
  );
}

export default App;
