import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>The Realms DAO | Home</title>
        <meta name="The Realms DAO" content="Community Owned 1/1 Collection" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
