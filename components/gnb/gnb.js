import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./gnb.module.scss";

const category = [
  { name: "journal", path: "/journal" },
  { name: "gallery", path: "/gallery" },
  { name: "FAQ", path: "/faq" },
];

export default function GlobalNavBar() {
  const router = useRouter();

  return (
    <nav>
      <ul className={styles.list}>
        {category.map((item, idx) => (
          <li key={idx} className={styles.item}>
            <Link href={item.path}>
              <a
                className={`
              ${styles.link}
              ${router.pathname.includes(item.path) ? styles.isActive : ""}
              `}
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
