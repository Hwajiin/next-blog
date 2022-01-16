import axios from "axios";
import PostThumbnail from "../../components/postThumbnail";

export default function JournalListPage({ data: posts }) {
  return (
    <section>
      <h1>Journal</h1>

      <ul>
        {posts &&
          Object.keys(posts).map((key) => (
            <li key={key}>
              <PostThumbnail path={`/journal/${key}`}>
                <p>{posts[key].title}</p>
                <pre>
                  {posts[key].contents.replaceAll(
                    /(<br>|<br \/>|<br\/>)/g,
                    "\r\n"
                  )}
                </pre>
              </PostThumbnail>
            </li>
          ))}
      </ul>
    </section>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/journal.json`
  );
  const data = await res.data;
  return { props: { data } };
}
