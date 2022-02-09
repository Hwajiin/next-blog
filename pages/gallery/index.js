import axios from "axios";
import PostItem from "../../components/post/postItem/postItem";
import PostListPageLayout from "../../components/post/postListPageLayout/postListPageLayout";

export default function GalleryListPage({ data: posts }) {
  const postsList =
    posts &&
    Object.keys(posts)
      .map((key) => ({
        id: key,
        ...posts[key],
      }))
      .reverse();

  return (
    <PostListPageLayout title="gallery">
      {postsList && (
        <ul>
          {postsList.map((post) => (
            <PostItem
              key={post.id}
              path={`/gallery/${post.id}`}
              title={post.title}
              image={post.url}
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
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery.json`
  );
  const data = await res.data;

  return {
    props: { data },
    revalidate: 1,
  };
}
