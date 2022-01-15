import { useState } from "react";
import { useRef } from "react";
import Form from "../../../components/form";
import { useImageService } from "../../../context/image";

export default function WriteGallery() {
  const { imageService } = useImageService();
  const [imgFile, setImgFile] = useState(null);

  const imgRef = useRef(null);

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
      >
        <label htmlFor="gallery">파일올리기</label>
        <input
          id="gallery"
          type="file"
          accept="image/*"
          ref={imgRef}
          onChange={imgPathHandler}
        />
      </Form>
    </section>
  );
}
