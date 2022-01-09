import { useRouter } from "next/router";
import { useRef, forwardRef, useState } from "react";

const Form = forwardRef(
  ({ children, contentType, postingHandler, database }, ref) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const titleRef = useRef();
    const contentRef = children.ref?.current || children[1]?.ref.current;

    const titleHandler = (e) => {
      setTitle(e.target.value);
    };

    const uploadPost = async (contents) => {
      setLoading(true);
      const uploadedDB = await database.upload(contentType, {
        date: new Date(),
        title,
        ...contents,
      });
      setLoading(false);
    };

    const router = useRouter();
    const postingByType = async (contentType) => {
      switch (contentType) {
        case "gallery":
          const uploaded = await postingHandler();
          uploadPost({
            url: uploaded.url,
            filename: uploaded.original_filename,
          });
          return router.push("/gallery");
        case "journal":
          const journalContents = await postingHandler();
          uploadPost(journalContents);
          return router.push("/journal");
        case "faq":
          const faqContents = await postingHandler();
          uploadPost(faqContents);
          return router.push("/faq");
        default:
          return router.push("/");
      }
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "" || contentRef.value === "") {
        console.log("텍스트를 입력해주세요");
      } else {
        postingByType(contentType);
      }
    };

    const resetHandler = (e) => {
      setTitle("");
    };

    return (
      <form>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          maxLength={30}
          placeholder="30자 이하로 작성해주세요"
          ref={titleRef}
          value={title}
          onChange={titleHandler}
        />
        {children}
        <button type="submit" onClick={submitHandler}>
          포스팅
        </button>
        <button type="reset" onClick={resetHandler}>
          다시쓰기
        </button>
      </form>
    );
  }
);

export default Form;
