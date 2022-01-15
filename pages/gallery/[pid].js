import axios from "axios";
import NotFound from "../../components/404";
import Post from "../../components/post";
import { useAuth } from "../../context/auth";

export default function GalleryPost({ data, pid }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!data && <NotFound />}
      {data && (
        <Post
          data={data}
          category="gallery"
          isAuth={isAuthenticated}
          pid={pid}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}