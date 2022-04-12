import type { NextPage } from "next";
import Head from "next/head";
import { CommunityGallery } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>The Realms DAO | Community Gallery</title>
        <meta name="The Realms DAO" content="Community Owned 1/1 Collection" />
      </Head>
      <CommunityGallery />
    </div>
  );
};

export default Home;
