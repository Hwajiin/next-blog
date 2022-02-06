import axios from "axios";
import PostDetail from "../../components/post/postDetail/postDetail";
import PostDetailPageLayout from "../../components/post/postDetailPageLayout/postDetailPageLayout";
import { useAuth } from "../../context/auth";

export default function GalleryPostPage({ data, pid }) {
  const { isAuthenticated } = useAuth();

  return (
    <PostDetailPageLayout>
      {data && (
        <PostDetail
          data={data}
          category="gallery"
          isAuth={isAuthenticated}
          pid={pid}
        />
      )}
    </PostDetailPageLayout>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery/${pid}.json`
  );

  const data = await res.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { data, pid } };
}
