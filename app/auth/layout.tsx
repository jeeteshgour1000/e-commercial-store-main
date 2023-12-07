/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from "../components/loginHeader";
import Footer from "../components/footer";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginHeader />
      {children}
      <Footer />
    </>
  );
}
