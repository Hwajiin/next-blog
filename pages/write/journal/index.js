import Form from "../../../components/form/form";
import FormInput from "../../../components/formInput/formInput";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import PostListPageLayout from "../../../components/post/postListPageLayout/postListPageLayout";

export default function WriteJournalPage() {
  const initialFormValues = {
    title: "",
    contents: "",
  };

  return (
    <PostListPageLayout title="👩🏻‍💻개발일지 쓰기">
      <Form initialFormValues={initialFormValues} category="journal">
        <FormInput
          label="# 제목"
          id="title"
          name="title"
          placeholder="50자 이내로 작성해주세요"
          maxLength={50}
        />

        <FormTextArea
          id="contents"
          label="글쓰기"
          name="contents"
          placeholder="오늘의 개발 이야기를 작성해주세요"
        />
      </Form>
    </PostListPageLayout>
  );
}
