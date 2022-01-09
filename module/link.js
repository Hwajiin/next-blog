import Link from "next/link";

export default function CustomLink({ path = "/", name = "link" }) {
  return (
    <Link href={path}>
      <a>{name}</a>
    </Link>
  );
}
