import PostListPageLayout from "../../components/post/postListPageLayout/postListPageLayout";
import WriteCategory from "../../components/write/writeCategory/writeCategory";

const category = [
  { name: "journal", path: "/write/journal" },
  { name: "gallery", path: "/write/gallery" },
  { name: "faq", path: "/write/faq" },
];

export default function WriteListPage() {
  return (
    <PostListPageLayout title="글쓰기">
      <WriteCategory category={category} />
    </PostListPageLayout>
  );
}
