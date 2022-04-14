import React from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import Link from "next/link";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/App.css";

// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
//const endpoint = "https://ssc-dao.genesysgo.net";
const endpoint = "https://api.mainnet-beta.solana.com";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

const openNav = () => {
  document.getElementById("nav")!.style.width = "250px";
};

const closeNav = () => {
  document.getElementById("nav")!.style.width = "0";
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="navMenu">
        <span onClick={openNav}>&#9776;</span>
      </div>
      <div id="nav" className="sidenav">
        <Link href="javascript:void(0)"><a onClick={closeNav} className="closebtn">&times;</a></Link>
        <Link href="/"><a onClick={closeNav}>HOME</a></Link>
        <Link href="/realms"><a onClick={closeNav}>REALMS</a></Link>
        <Link href="/gallery"><a onClick={closeNav}>COMMUNITY GALLERY</a></Link>
        <Link href="/join"><a onClick={closeNav}>JOIN</a></Link>
      </div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default MyApp;
