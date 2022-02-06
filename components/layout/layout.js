import styles from "./layout.module.scss";
import Footer from "../footer/footer";
import Header from "../header/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
