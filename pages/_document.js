import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>borderline0px의 블로그</title>

          <meta
            name="description"
            content="Next와 SCSS로 구현한 borderline0px의 블로그입니다. 개발일지와 사진, FAQ를 열람해보세요."
          />
          <meta name="keywords" content="next, nextjs, frontend, react, scss" />

          <meta property="og:title" content="HOME | borderline0px의 블로그" />
          <meta
            property="og:description"
            content="Next와 SCSS로 구현한 borderline0px의 블로그입니다. 개발일지와 사진, FAQ를 열람해보세요."
          />

          {/* TODO: IMG URL */}
          <meta property="og:image" content="대표 이미지" />
          <meta name="twitter:card" content="summary" />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
