import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import OrderContext from "../Contexts/OrdersContext";

//For Context API purpose
import AuthContext from "../Contexts/AuthContext";

export default function MainLayout() {
  return (
    <>
      <AuthContext>
        <NavBar />
        <OrderContext>
          <section className={styles.mainContainer}>
            <Outlet />
          </section>
        </OrderContext>
      </AuthContext>
    </>
  );
}
