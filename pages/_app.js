import Layout from "../components/layout";
import "../styles/globals.css";
import ImageService from "../service/image";
import Database from "../service/database";
import { useRouter } from "next/router";

const imageService = new ImageService();
const database = new Database();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout>
      <Component
        imageService={imageService}
        database={database}
        {...pageProps}
      />
    </Layout>
  );
}

export default MyApp;
