import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/auth";
import { useDB } from "../../../context/database";
import { useImageService } from "../../../context/image";
import Button from "../../../module/button/button";
import CustomLink from "../../../module/link/link";
import styles from "./postDetail.module.scss";

export default function PostDetail({ category, data, isAuth, pid }) {
  const { firebaseAuth } = useAuth();
  const { imageService } = useImageService();
  const { database } = useDB();

  const router = useRouter();

  const formattedDate = new Date(data.date)
    .toLocaleDateString()
    .split(".")
    .slice(0, 3)
    .map((item) => item.trim())
    .join("-");

  const deleteHandler = async () => {
    const idToken = await firebaseAuth.getIdToken();
    try {
      if (category === "gallery") {
        Promise.all([
          imageService.delete(data.image_id),
          database.delete(category, pid, idToken),
        ]);
      } else {
        Promise.all([database.delete(category, pid, idToken)]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      router.reload(router.asPath);
    }
  };

  return (
    <div className={styles.container}>
      {isAuth && (
        <div className={styles.toolbar}>
          <Button
            name="삭제하기"
            clickHandler={deleteHandler}
            isOutlined={true}
          />
          <CustomLink
            name="수정하기"
            path={`/write/${category}/${pid}`}
            isOutlined={true}
          />
        </div>
      )}

      <header className={styles.header}>
        <h3 className={styles.title}># {data.title}</h3>
        <time>{data.date && formattedDate}</time>
      </header>

      <div className={styles.contentsBox}>
        {category === "gallery" && (
          <div className={styles.image}>
            <Image
              src={data.url}
              alt={data.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        {!(category === "gallery") && (
          <p>
            {data.contents &&
              data.contents.replaceAll(/(<br>|<br \/>|<br\/>)/g, "\r\n")}
          </p>
        )}
      </div>
    </div>
  );
}
