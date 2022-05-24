import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Noob from "../components/Noob";
import Pro from "../components/Pro";

const Home: NextPage = () => {
  const [pro, setPro] = useState(true);
  return (
    <div className="bg-[#111] text-white min-h-screen">
      <Head>
        <title>Link Shortner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="title" content="Link Shortner" />
        <meta name="description" content="Shorten Your Links the pro way" />

        <meta property="og:title" content="Link Shortner" />
        <meta property="og:site_name" content="SynTech-X" />

        <meta name="og:description" content="Shorten Your Links the pro way" />
      </Head>

      <Header />
      <div className="text-center mt-2">
        <span className="md:text-xl sm:text-lg mx-2">
          Shorten Your Links the pro way :)
        </span>
      </div>
      <main className="mt-[20vh] min-h-[50vh]">
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
      <Footer />
    </div>
  );
};

export default Home;
