import Link from "next/link";
import styles from "./link.module.scss";

export default function CustomLink({
  path = "/",
  name = "link",
  isOutlined = false,
  isSquare = false,
  label = "",
}) {
  return (
    <Link href={path}>
      <a
        className={`
      ${styles.link} 
      ${isOutlined ? styles.isOutlined : ""} 
      ${isSquare ? styles.isSquare : ""}`}
        aria-label={label}
      >
        {name}
      </a>
    </Link>
  );
}
