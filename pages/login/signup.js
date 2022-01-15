import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Signup({ firebaseAuth }) {
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

  const singUpHandler = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || pw.trim() === "") {
      console.log("이메일 또는 비밀번호를 입력해주세요");
    } else {
      firebaseAuth.signUp(email, pw);
    }
  };

  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });

  return (
    <form>
      <h2>회원가입</h2>

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        onChange={emailHandler}
        value={email}
        ref={emailRef}
        placeholder="이메일을 입력해주세요"
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        onChange={pwHandler}
        value={pw}
        ref={pwRef}
        placeholder="비밀번호를 입력해주세요"
        minLength={5}
      />

      <button onClick={singUpHandler}>Sign Up</button>
    </form>
  );
}
