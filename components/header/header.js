import Link from "next/link";
import GlobalNavBar from "../gnb/gnb";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_sm_4}>
            <h1 className={styles.logo}>
              <Link href="/">0px-log</Link>
            </h1>
            <GlobalNavBar />
          </div>
        </div>
      </div>
    </header>
  );
}
