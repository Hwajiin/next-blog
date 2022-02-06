import styles from "./postDetailPageLayout.module.scss";

export default function PostDetailPageLayout({ children }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_sm_4}>{children}</div>
        </div>
      </div>
    </section>
  );
}
