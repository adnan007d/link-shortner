import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Noob from "../components/Noob";

const Home: NextPage = () => {
  return (
    <div className="bg-[#111] text-white min-h-screen">
      <Head>
        <title>WooW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Noob />
    </div>
  );
};

export default Home;
