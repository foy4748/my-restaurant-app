import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import MainLayout from "../components/MainLayout";
import Dishes from "../components/Dishes";
import Login from "../components/Login";
import Register from "../components/Register";
import Orders from "../components/Orders";
import Tables from "../components/Tables";
import CategoryFoods from "../components/CategoryFoods";

//Loaders
//const dishLoader = async () => {
//  return fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=a");
//};

const routerObj = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dishes />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            {" "}
            <Orders />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            {" "}
            <Tables />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/categories/:categoryName",
        loader: async ({ params }) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`
          ),
        element: <CategoryFoods />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default function RouterComponent() {
  return <RouterProvider router={router}> </RouterProvider>;
}
