import axios from "axios";
import HeadCompo from "../../components/head";
import PostDetail from "../../components/post/postDetail/postDetail";
import PostDetailPageLayout from "../../components/post/postDetailPageLayout/postDetailPageLayout";
import { useAuth } from "../../context/auth";

export default function JournalPostPage({ data, pid }) {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <HeadCompo title={data.title} description={data.contents} />

      <PostDetailPageLayout>
        {data && (
          <PostDetail
            data={data}
            category="journal"
            isAuth={isAuthenticated}
            pid={pid}
          />
        )}
      </PostDetailPageLayout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/journal/${pid}.json`
  );

  const data = await res.data;

  if (!data) {
    return {
      redirect: {
        destination: "/journal",
        permanent: false,
      },
    };
  }

  return { props: { data, pid } };
}
