import { useForm } from "../form/form";
import styles from "./formTextArea.module.scss";

export default function FormTextArea({
  label,
  id,
  name,
  placeholder = null,
  cols = 50,
  rows = 10,
}) {
  const { form, formChangeHandler } = useForm();

  return (
    <div className={styles.formTextArea}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={formChangeHandler}
        cols={cols}
        rows={rows}
      />
    </div>
  );
}
