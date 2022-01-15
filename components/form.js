import { useRouter } from "next/router";
import { useRef, forwardRef, useState } from "react";
import { useAuth } from "../context/auth";
import { useDB } from "../context/database";

const Form = forwardRef(
  ({ children, contentType, postingHandler, pid = null, data = null }, ref) => {
    const { firebaseAuth } = useAuth();
    const { database } = useDB();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(data ? data.title : "");
    const titleRef = useRef();

    let contentValue;
    if (contentType === "gallery") {
      contentValue = children[1].ref.current?.files[0] || null;
    } else {
      contentValue = children[1].props.value;
    }

    const titleHandler = (e) => {
      setTitle(e.target.value);
    };

    const uploadPost = async (pid, contents) => {
      setLoading(true);
      const idToken = await firebaseAuth.getIdToken();

      if (!pid) {
        const uploadedDB = await database.upload(
          contentType,
          {
            date: new Date(),
            title,
            ...contents,
          },
          idToken
        );
      } else {
        const editDB = await database.edit(
          contentType,
          pid,
          {
            title,
            ...contents,
          },
          idToken
        );
      }

      setLoading(false);
    };

    const router = useRouter();
    const postingByType = async (contentType) => {
      try {
        switch (contentType) {
          case "gallery":
            const uploaded = await postingHandler();
            uploadPost(pid, {
              url: uploaded.url,
              filename: uploaded.original_filename,
              image_id: uploaded.public_id,
            });
            return await router.push("/gallery");

          case "journal":
            const journalContents = await postingHandler();
            uploadPost(pid, journalContents);
            return await router.push("/journal");

          case "faq":
            const faqContents = await postingHandler();
            uploadPost(pid, faqContents);
            return await router.push("/faq");

          default:
            return router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        router.reload(`/${contentType}`);
      }
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (title.trim() === "" || !contentValue) {
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

        {!pid ? (
          <button type="submit" onClick={submitHandler}>
            포스팅
          </button>
        ) : (
          <button type="submit" onClick={submitHandler}>
            수정완료
          </button>
        )}

        <button type="reset" onClick={resetHandler}>
          다시쓰기
        </button>
      </form>
    );
  }
);

export default Form;
