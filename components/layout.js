import { useState } from "react";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  let id;
  if (children.props.uid) {
    id = children.props.uid;
  } else {
    id = null;
  }

  return (
    <div>
      <Header />
      {children}
      <Footer id={id} />
    </div>
  );
}
