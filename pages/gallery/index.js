import axios from "axios";
import { useEffect, useState } from "react";

export default function Gallery({ data }) {
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(data);
  }, [data]);

  return (
    <section>
      <h2>Gallery</h2>
      {Object.keys(post).map((key) => (
        <p key={key}>{post[key].title}</p>
      ))}
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
