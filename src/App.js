import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/MainLayout";
//For routing purpose
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
