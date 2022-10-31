import router from "./Routes/router";
import { RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import "font-awesome/css/font-awesome.min.css"; //import in react app

function App() {
  return <RouterProvider router={router} />;
}

export default App;
