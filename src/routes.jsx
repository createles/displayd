import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import GameDetails from "./pages/GameDetails";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./Layout";

const routes = [
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "shop",
        element: <ShopPage/>
      },
      {
        path: "shop/:id",
        element: <GameDetails />
      },
      {
        path: "cart",
        element: <CartPage/>
      },
      { 
        path: "*", 
        element: <ErrorPage /> 
      },
    ],
  },
];

export default routes;