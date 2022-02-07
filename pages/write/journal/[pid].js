import axios from "axios";
import Form from "../../../components/form/form";
import FormInput from "../../../components/formInput/formInput";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import PostListPageLayout from "../../../components/post/postListPageLayout/postListPageLayout";
import { convertHTMLElement } from "../../../service/form";

export default function JournalEditPage({ data, pid }) {
  const initialFormValues = {
    title: data.title,
    contents: convertHTMLElement(data.contents),
  };

  return (
    <PostListPageLayout title="개발일지 수정하기">
      <Form initialFormValues={initialFormValues} category="journal" pid={pid}>
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

export async function getServerSideProps(context) {
  const { pid } = context.query;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/journal/${pid}.json`
  );

  const data = await res.data;

  return { props: { data, pid } };
}
