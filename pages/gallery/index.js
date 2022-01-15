import axios from "axios";
import PostThumbnail from "../../components/postThumbnail";

export default function Gallery({ data: posts }) {
  return (
    <section>
      <h2>Gallery</h2>
      <ul>
        {posts &&
          Object.keys(posts).map((key) => (
            <li key={key}>
              <PostThumbnail path={`/gallery/${key}`}>
                <p key={key}>{posts[key].title}</p>
              </PostThumbnail>
            </li>
          ))}
      </ul>
    </section>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery.json`
  );
  const data = await res.data;

  return {
    props: { data },
  };
}
