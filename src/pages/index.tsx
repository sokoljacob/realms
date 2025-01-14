import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>THE REALMS DAO | HOME</title>
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
