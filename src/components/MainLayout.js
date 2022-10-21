import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export default function MealsContainer() {
  return (
    <>
      <NavBar />
      <section className={styles.mainContainer}>
        <Outlet />
      </section>
    </>
  );
}
