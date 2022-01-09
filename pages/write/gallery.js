import { useState } from "react";
import { useRef } from "react";
import Form from "../../components/form";

export default function WriteGallery({ imageService, database, uid }) {
  console.log(uid);
  const [imgFile, setImgFile] = useState(null);

  const imgRef = useRef();

  const imgPathHandler = async () => {
    if (imgRef.current) {
      setImgFile(imgRef.current.files[0]);
    }
  };

  const imgHandler = async () => {
    return await imageService.upload(imgFile);
  };

  return (
    <section>
      <h1>📷오늘의 나를 기록해보세요</h1>
      <Form
        contentRef={imgRef}
        postingHandler={imgHandler}
        contentType="gallery"
        database={database}
      >
        <input
          type="file"
          accept="image/*"
          ref={imgRef}
          onChange={imgPathHandler}
        />
      </Form>
    </section>
  );
}
