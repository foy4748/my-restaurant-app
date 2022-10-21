import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dishes from "../components/Dishes";
import Login from "../components/Login";
import Register from "../components/Register";

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

export default router;
