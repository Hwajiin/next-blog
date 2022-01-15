import axios from "axios";
import { useRef, useState } from "react";
import Form from "../../../components/form";
import { useImageService } from "../../../context/image";

export default function GalleryEditPage({ data, pid }) {
  const { imageService } = useImageService();
  const [imgFile, setImgFile] = useState(null);

  const imgRef = useRef(null);

  const imgPathHandler = async () => {
    if (imgRef.current) {
      setImgFile(imgRef.current.files[0]);
    }
  };

  const deletePrevImg = async () => {
    await imageService.delete(data.image_id);
  };

  const imgHandler = async () => {
    deletePrevImg();
    return await imageService.upload(imgFile);
  };

  return (
    <section>
      <h1>Gallery 수정하기</h1>
      <Form
        contentType="gallery"
        postingHandler={imgHandler}
        pid={pid}
        data={data}
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

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}
