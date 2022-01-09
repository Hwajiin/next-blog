import CustomLink from "../module/link";

export default function Footer(props) {
  const { id } = props;

  return (
    <footer>
      {id ? (
        <>
          <ul>
            <li>
              <CustomLink name="일지쓰기" path="/write/journal" />
            </li>
            <li>
              <CustomLink name="사진 올리기" path="/write/gallery" />
            </li>
            <li>
              <CustomLink name="FAQ 쓰기" path="/write/faq" />
            </li>
          </ul>
          <button type="button">Logout</button>
        </>
      ) : (
        <CustomLink name="Login" path="/login" />
      )}
    </footer>
  );
}
