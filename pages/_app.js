import Layout from "../components/layout";
import "../styles/globals.css";
import { AuthProvider, ProtectRoute } from "../context/auth";
import { DatabaseProvider } from "../context/database";
import { ImageProvider } from "../context/image";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <ImageProvider>
          <ProtectRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectRoute>
        </ImageProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default MyApp;
