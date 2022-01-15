import axios from "axios";
import { useRef, useState } from "react";
import Form from "../../../components/form";

export default function JournalEditPage({ data, pid }) {
  const [text, setText] = useState(data.contents);
  const textRef = useRef();

  const textHandler = () => {
    setText(textRef?.current.value);
  };

  const journalHandler = () => {
    return { contents: text.replaceAll(/(\n|\r)/g, "<br>") };
  };

  return (
    <section>
      <h1>일지 수정하기</h1>
      <Form
        contentType="journal"
        postingHandler={journalHandler}
        pid={pid}
        data={data}
      >
        <label htmlFor="journal">글쓰기</label>
        <textarea
          id="journal"
          cols="50"
          rows="10"
          ref={textRef}
          value={text}
          onChange={textHandler}
        />
      </Form>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/journal/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}
