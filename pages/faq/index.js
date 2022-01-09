import axios from "axios";

export default function Faq({ data }) {
  return (
    <section>
      <h2>FAQ</h2>
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <p>{data[key].title}</p>
            <pre>
              {data[key].contents.replaceAll(/(<br>|<br \/>|<br\/>)/g, "\r\n")}
            </pre>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq.json`
  );
  const data = await res.data;
  return { props: { data } };
}
