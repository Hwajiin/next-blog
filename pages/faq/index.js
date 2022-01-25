import axios from "axios";
import PostThumbnail from "../../components/postThumbnail";

export default function FaqListPage({ data: posts }) {
  return (
    <section>
      <h2>FAQ</h2>
      <ul>
        {posts &&
          Object.keys(posts).map((key) => (
            <li key={key}>
              <PostThumbnail path={`/faq/${key}`}>
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

export async function getStaticProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq.json`
  );
  const data = await res.data;

  return { props: { data }, revalidate: 1 };
}
