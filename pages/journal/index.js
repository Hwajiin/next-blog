import axios from "axios";
import HeadCompo from "../../components/head";
import PostItem from "../../components/post/postItem/postItem";
import PostListPageLayout from "../../components/post/postListPageLayout/postListPageLayout";

export default function JournalListPage({ data: posts }) {
  const postsList =
    posts &&
    Object.keys(posts)
      .map((key) => ({
        id: key,
        ...posts[key],
      }))
      .reverse();

  return (
    <div>
      <HeadCompo
        title="Journal"
        description="개발 일지에 관한 페이지입니다. 개발 일지를 구경해보세요."
      />

      <PostListPageLayout title="journal">
        {postsList && (
          <ul>
            {postsList.map((post) => (
              <PostItem
                key={post.id}
                path={`/journal/${post.id}`}
                title={post.title}
                contents={post.contents}
              />
            ))}
          </ul>
        )}

        {!posts && <p>게시물이 없습니다</p>}
      </PostListPageLayout>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/journal.json`
  );
  const data = await res.data;
  return { props: { data }, revalidate: 1 };
}
