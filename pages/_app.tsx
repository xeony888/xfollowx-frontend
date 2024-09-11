import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import NavBar from "@/components/NavBar";
import Wrapper from "@/components/Wrapper";

require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL!, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect={true}>
        <WalletModalProvider>
          <Wrapper>
            <NavBar />
            <Component {...pageProps} />
          </Wrapper>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
