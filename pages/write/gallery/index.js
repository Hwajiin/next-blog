import FileInput from "../../../components/fileInput/fileInput";
import Form from "../../../components/form/form";
import FormInput from "../../../components/formInput/formInput";
import PostListPageLayout from "../../../components/post/postListPageLayout/postListPageLayout";

export default function WriteGalleryPage() {
  const initialFormValues = {
    title: "",
    imgFile: "",
  };

  return (
    <PostListPageLayout title="📷 오늘의 나를 기록해보세요">
      <Form initialFormValues={initialFormValues} category="gallery">
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
