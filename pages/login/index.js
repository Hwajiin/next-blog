import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import PostListPageLayout from "../../components/post/postListPageLayout/postListPageLayout";
import { useAuth } from "../../context/auth";
import Button from "../../module/button/button";
import styles from "./login.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const { login, uid } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const emailRef = useRef();
  const pwRef = useRef();

  const emailHandler = () => {
    setEmail(emailRef.current.value);
  };
  const pwHandler = () => {
    setPw(pwRef.current.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || pw.trim() === "") {
      console.log("아이디 또는 비밀번호를 입력해주세요");
    } else {
      login(email, pw);
    }
  };

  useEffect(() => {
    if (uid) {
      router.push("/");
    }
  });

  return (
    <PostListPageLayout title="로그인하기">
      <form className={styles.form}>
        <div className={styles.inputBox}>
          <label htmlFor="email">아이디</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 적어주세요"
            ref={emailRef}
            value={email}
            onChange={emailHandler}
          />
        </div>

        <div className={styles.inputBox}>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 적어주세요"
            ref={pwRef}
            value={pw}
            onChange={pwHandler}
          />
        </div>

        <Button
          type="submit"
          name="Log In"
          clickHandler={loginHandler}
          isOutlined={true}
        />
      </form>
    </PostListPageLayout>
  );
}
