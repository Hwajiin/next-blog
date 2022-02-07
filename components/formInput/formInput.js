import { useForm } from "../form/form";
import styles from "./formInput.module.scss";

export default function FormInput({
  label,
  type = "text",
  id,
  name,
  placeholder = null,
  maxLength = null,
}) {
  const { form, formChangeHandler } = useForm();

  return (
    <div className={styles.formInput}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={formChangeHandler}
        maxLength={maxLength}
      />
    </div>
  );
}
