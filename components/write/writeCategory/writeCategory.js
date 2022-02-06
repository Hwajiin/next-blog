import Link from "next/link";
import styles from "./writeCategory.module.scss";

export default function WriteCategory({ category }) {
  return (
    <ul className={styles.list}>
      {category.map((item, idx) => (
        <li key={idx} className={styles.item}>
          <Link href={item.path}>
            <a className={styles.link}>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
