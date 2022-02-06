import styles from "./postListPageLayout.module.scss";

export default function PostListPageLayout({ title, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col_sm_4}>
            <h2 className={styles.title}>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
