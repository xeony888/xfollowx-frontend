import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";
import Wrapper from "@/components/Wrapper";
import Footer from "@/components/Footer";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Wrapper>
  );
}
