import Link from "next/link";
import styles from "./gnb.module.scss";

const category = [
  { name: "journal", path: "/journal" },
  { name: "gallery", path: "/gallery" },
  { name: "FAQ", path: "/faq" },
];

export default function GlobalNavBar() {
  return (
    <nav>
      <ul className={styles.list}>
        {category.map((item, index) => (
          <li key={index} className={styles.item}>
            <Link href={item.path}>
              <a className={styles.link}>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
