import { useForm } from "../form/form";
import styles from "./fileInput.module.scss";

export default function FileInput({ label, id, name }) {
  const { form, formChangeHandler } = useForm();

  return (
    <div className={styles.fileInput}>
      <label htmlFor={id}>
        {label}
        <div className={styles.state}>
          {form.imgFile ? form.imgFile.name : "파일을 업로드해주세요 🐰"}
        </div>
      </label>

      <input
        id={id}
        type="file"
        accept="image/*"
        name={name}
        onChange={formChangeHandler}
      />
    </div>
  );
}
