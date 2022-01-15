import { useRef, useState } from "react";
import { useAuth } from "../../context/auth";

export default function Login() {
  const { login } = useAuth();
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

  return (
    <form>
      <label htmlFor="email">아이디</label>
      <input
        id="email"
        type="email"
        placeholder="이메일을 적어주세요"
        ref={emailRef}
        value={email}
        onChange={emailHandler}
      />

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호를 적어주세요"
        ref={pwRef}
        value={pw}
        onChange={pwHandler}
      />

      <button type="submit" onClick={loginHandler}>
        로그인
      </button>
    </form>
  );
}
