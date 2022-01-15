import Link from "next/link";

export default function PostThumbnail({ path, children }) {
  return (
    <Link href={path}>
      <a>{children}</a>
    </Link>
  );
}
