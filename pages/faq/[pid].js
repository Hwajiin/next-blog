import axios from "axios";
import Post from "../../components/post";
import { useAuth } from "../../context/auth";
import NotFound from "../404";

export default function FaqPost({ data, pid }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!data && <NotFound />}
      {data && (
        <Post data={data} category="faq" isAuth={isAuthenticated} pid={pid} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}
