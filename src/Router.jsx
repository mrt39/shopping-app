import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import StorePage from "./routes/StorePage";
import ShoppingCart from "./routes/ShoppingCart"
import HomePage from "./routes/HomePage"
import './App.css'
import ErrorPage from "./components/ErrorPage";
import { CartProvider } from "./contexts/CartContext";
import { GamesProvider } from "./contexts/GamesContext";

const Router = () => {
 const router = createBrowserRouter([
  {
    path: "/shopping-app/",
    errorElement: <ErrorPage />,
    element: <Dashboard />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "store", element: <StorePage /> },
      { path: "cart", element: <ShoppingCart /> },
    ],
  },
]);

  return (
    <GamesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </GamesProvider>
  );
};

export default Router;
