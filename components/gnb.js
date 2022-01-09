import Link from "next/link";

const category = [
  { name: "home", path: "/" },
  { name: "journal", path: "/journal" },
  { name: "gallery", path: "/gallery" },
  { name: "FAQ", path: "/faq" },
];

export default function GlobalNavBar() {
  return (
    <nav>
      <ul>
        {category.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
