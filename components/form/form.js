import { useRouter } from "next/router";
import { useState, createContext, useContext } from "react";
import { useAuth } from "../../context/auth";
import { useDB } from "../../context/database";
import { useImageService } from "../../context/image";
import Button from "../../module/button/button";
import FormUtils from "../../service/form";
import styles from "./form.module.scss";

export const FormContext = createContext({
  form: {},
  formChangeHandler: () => {},
});

export default function Form({
  children,
  category,
  initialFormValues,
  pid = null,
}) {
  const { database } = useDB();
  const { firebaseAuth } = useAuth();
  const { imageService } = useImageService();

  const router = useRouter();
  const [form, setForm] = useState(initialFormValues);
  const [loading, setLoading] = useState(false);

  const formUtils = new FormUtils(
    setLoading,
    form,
    setForm,
    pid,
    database,
    firebaseAuth,
    imageService
  );

  // TODO: Loading이 완료된 후 redirect 되도록 리팩토링하기
  const redirectingRoute = (category) => {
    if (!loading) {
      if (category) {
        router.push(`/${category}`);
      } else {
        router.push("/");
      }
    } else {
      console.log("로딩 중");
    }
  };

  // TODO: formChangeHandler 리팩토링하기
  const formChangeHandler = (event) => {
    const { name } = event.target;

    if (router.pathname.includes("/write/gallery")) {
      if (name === "imgFile") {
        setForm({
          ...form,
          imgFile: event.target.files[0],
        });
      } else {
        setForm({
          ...form,
          [name]: event.target.value,
        });
      }
    } else {
      setForm({
        ...form,
        [name]: event.target.value,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const validate = formUtils.validate();

    if (!validate) {
      console.warn("제목, 파일 및 내용을 입력해주세요!");
    } else {
      try {
        formUtils.postingByCategory(category);
      } catch (error) {
        console.log(error);
      } finally {
        redirectingRoute(category);
      }
    }
  };

  const resetHandler = () => {
    formUtils.reset();
  };

  return (
    <form className={styles.form}>
      <FormContext.Provider
        value={{
          form,
          formChangeHandler,
        }}
      >
        <div className={styles.buttonsBox}>
          <Button
            type="submit"
            name={!pid ? "포스팅" : "수정완료"}
            clickHandler={submitHandler}
            isOutlined={true}
          />

          <Button
            type="reset"
            name="다시쓰기"
            clickHandler={resetHandler}
            isOutlined={true}
          />
        </div>

        {children}
      </FormContext.Provider>
    </form>
  );
}

export const useForm = () => useContext(FormContext);
