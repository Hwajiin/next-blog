import axios from "axios";
import { useRef, useState } from "react";
import Form from "../../../components/form";

export default function FaqEditPage({ data, pid }) {
  const [text, setText] = useState(data.contents);
  const textRef = useRef();

  const textHandler = () => {
    setText(textRef?.current.value);
  };

  const faqHandler = () => {
    return { contents: text.replaceAll(/(\n|\r)/g, "<br>") };
  };

  return (
    <section>
      <h1>FAQ 수정하기</h1>
      <Form contentType="faq" postingHandler={faqHandler} pid={pid} data={data}>
        <label htmlFor="faq">글쓰기</label>
        <textarea
          id="faq"
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
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}
