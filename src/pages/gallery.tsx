import type { NextPage } from "next";
import Head from "next/head";
import { RealmsGallery } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT Gallery!</title>
        <meta name="description" content="This site will fly high 🦤" />
      </Head>
      <RealmsGallery />
    </div>
  );
};

export default Home;
