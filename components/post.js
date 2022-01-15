import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { useDB } from "../context/database";
import { useImageService } from "../context/image";
import CustomLink from "../module/link";

export default function Post({ category, data, isAuth, pid }) {
  const { firebaseAuth } = useAuth();
  const router = useRouter();
  const { imageService } = useImageService();
  const { database } = useDB();

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
    <div>
      <h3>{data.title}</h3>
      {category === "gallery" ? (
        <img crossOrigin="anonymous" src={data.url} />
      ) : (
        <pre>{data.contents.replaceAll(/(<br>|<br \/>|<br\/>)/g, "\r\n")}</pre>
      )}
      {isAuth && (
        <div>
          <button type="button" onClick={deleteHandler}>
            삭제하기
          </button>
          <CustomLink name="수정하기" path={`/write/${category}/${pid}`} />
        </div>
      )}
    </div>
  );
}
