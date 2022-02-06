import axios from "axios";
import PostItem from "../../components/post/postItem/postItem";
import PostListPageLayout from "../../components/post/postListPageLayout/postListPageLayout";

export default function FaqListPage({ data: posts }) {
  return (
    <PostListPageLayout title="faq">
      {posts && (
        <ul>
          {Object.keys(posts).map((key) => (
            <PostItem
              key={key}
              path={`/faq/${key}`}
              title={posts[key].title}
              contents={posts[key].contents}
            />
          ))}
        </ul>
      )}
      {!posts && <p>게시물이 없습니다</p>}
    </PostListPageLayout>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq.json`
  );
  const data = await res.data;

  return { props: { data }, revalidate: 1 };
}
