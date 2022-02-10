import Head from "next/head";

export default function HeadCompo({ title = "", description = "" }) {
  return (
    <Head>
      <title>
        {title.length > 10 ? `${title.slice(0, 10)}...` : title} |
        borderline0px의 블로그
      </title>

      <meta
        name="description"
        content={
          description.length > 100
            ? `${description.slice(0, 100)}...`
            : description
        }
      />

      <meta property="og:title" content={`${title} | borderline0px의 블로그`} />
      <meta
        property="og:description"
        content={
          description.length > 100
            ? `${description.slice(0, 100)}...`
            : description
        }
      />
    </Head>
  );
}
