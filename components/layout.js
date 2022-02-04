import Footer from "./footer";
import Header from "./header/header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
