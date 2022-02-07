import axios from "axios";
import FileInput from "../../../components/fileInput/fileInput";
import Form from "../../../components/form/form";
import FormInput from "../../../components/formInput/formInput";
import PostListPageLayout from "../../../components/post/postListPageLayout/postListPageLayout";

export default function GalleryEditPage({ data, pid }) {
  const initialFormValues = {
    title: data.title,
    imgFile: "",
  };

  return (
    <PostListPageLayout title="Gallery 수정하기">
      <Form initialFormValues={initialFormValues} category="gallery" pid={pid}>
        <FormInput
          label="# 제목"
          id="title"
          name="title"
          placeholder="50자 이내로 작성해주세요"
          maxLength={50}
        />

        <FileInput label="이미지 파일" id="imgFile" name="imgFile" />
      </Form>
    </PostListPageLayout>
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
