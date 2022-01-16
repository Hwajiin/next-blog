import { useRef, useState } from "react";
import Form from "../../../components/form";

export default function WriteJournalPage() {
  const [text, setText] = useState("");
  const textRef = useRef();

  const textHandler = () => {
    setText(textRef?.current.value);
  };

  const journalHandler = () => {
    return { contents: text.replaceAll(/(\n|\r)/g, "<br>") };
  };

  return (
    <section>
      <h1>👩🏻‍💻개발일지 쓰기</h1>
      <Form
        contentType="journal"
        contentRef={textRef}
        postingHandler={journalHandler}
      >
        <label htmlFor="journal">글쓰기</label>
        <textarea
          id="journal"
          cols="50"
          rows="10"
          value={text}
          ref={textRef}
          onChange={textHandler}
        />
      </Form>
    </section>
  );
}
