import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import FileInput from "../../../components/fileInput/fileInput";
import Form from "../../../components/form/form";
import FormInput from "../../../components/formInput/formInput";
import PostListPageLayout from "../../../components/post/postListPageLayout/postListPageLayout";
import Spinner from "../../../module/spinner/spinner";

// TODO: useSWR 로직 재사용성 높이기
const fetcher = async (...args) => {
  const res = await axios.get(...args);
  return res.data;
};

export default function GalleryEditPage() {
  const {
    query: { pid },
  } = useRouter();

  const { error, data } = useSWR(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/gallery/${pid}.json`,
    fetcher
  );

  if (error) {
    return <p>error...</p>;
  }

  if (!data) {
    return <Spinner />;
  }

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
