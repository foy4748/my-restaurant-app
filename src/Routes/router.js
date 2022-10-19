import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dishes from "../components/Dishes";

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
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default router;
