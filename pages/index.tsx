import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Header from "../components/Header";
import Noob from "../components/Noob";
import Pro from "../components/Pro";

const Home: NextPage = () => {
  const [pro, setPro] = useState(true);
  return (
    <div className="bg-[#111] text-white min-h-screen">
      <Head>
        <title>WooW</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <main className="mt-[20vh]">
        <div className="flex items-center justify-around">
          <button
            className={`btn ${pro && "active"}`}
            onClick={() => setPro(true)}
          >
            Pro
          </button>
          <button
            className={`btn ${!pro && "active"}`}
            onClick={() => setPro(false)}
          >
            NooB
          </button>
        </div>
        <section className="mt-4">{pro ? <Pro /> : <Noob />}</section>
      </main>
    </div>
  );
};

export default Home;
