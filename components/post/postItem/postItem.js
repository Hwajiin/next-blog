import Link from "next/link";
import Image from "next/image";
import styles from "./postItem.module.scss";

export default function PostItem({
  path,
  image = null,
  title,
  contents = null,
}) {
  const preview = contents?.replaceAll(/(<br>|<br \/>|<br\/>)/g, " ");

  return (
    <li className={styles.item}>
      <Link href={path}>
        <a className={styles.link}>
          {image && (
            <div className={styles.image}>
              <Image src={image} layout="fill" objectFit="cover" alt={title} />
            </div>
          )}

          <div className={styles.contentsBox}>
            <h3 className={styles.title}>{title}</h3>
            {preview && (
              <p className={styles.preview}>
                {preview.length > 50 ? `${preview.slice(0, 50)}...` : preview}
              </p>
            )}
          </div>
        </a>
      </Link>
    </li>
  );
}
