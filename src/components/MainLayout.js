import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import OrderContext from "../Contexts/OrdersContext";

export default function MealsContainer() {
  return (
    <>
      <NavBar />
      <OrderContext>
        <section className={styles.mainContainer}>
          <Outlet />
        </section>
      </OrderContext>
    </>
  );
}
