import styles from "./button.module.scss";

export default function Button({
  name = "button",
  type = "button",
  clickHandler,
  isOutlined = false,
  isSquare = false,
  label = "",
}) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`
      ${styles.button} 
      ${isOutlined ? styles.isOutlined : ""} 
      ${isSquare ? styles.isSquare : ""}`}
      aria-label={label}
    >
      {name}
    </button>
  );
}
