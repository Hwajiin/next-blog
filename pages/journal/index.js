import axios from "axios";

export default function Journal({ data: posts }) {
  return (
    <section>
      <h1>Journal</h1>
      <ul>
        {Object.keys(posts).map((key) => (
          <li key={key}>
            <p>{posts[key].title}</p>
            <pre>
              {posts[key].contents.replaceAll(/(<br>|<br \/>|<br\/>)/g, "\r\n")}
            </pre>
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
