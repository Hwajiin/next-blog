import { useRef, useState } from "react";
import Form from "../../../components/form";

export default function WriteFaq() {
  const [text, setText] = useState("");
  const textRef = useRef();

  const textHandler = () => {
    setText(textRef?.current.value);
  };

  const faqHandler = () => {
    return { contents: text.replaceAll(/(\n|\r)/g, "<br>") };
  };

  return (
    <section>
      <h1>✏️FAQ 쓰기</h1>
      <Form contentType="faq" contentRef={textRef} postingHandler={faqHandler}>
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
