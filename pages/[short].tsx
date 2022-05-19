import { GetServerSidePropsContext } from "next";
import Error from "next/error";
import React from "react";
import dbConnect from "../config/mongoose";
import getLink from "../controller/getLink";

const Custom404 = () => {
  return (
    <div className="grid place-items-center h-screen w-screen">
      <p>404 Not Found</p>
    </div>
  );
};

const Short = ({ errorCode }: { errorCode: number }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  return <Custom404 />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const short = context.query.short;

  await dbConnect();

  let link = null;
  if (short && typeof short === "string") {
    const linkDoc = await getLink(short);
    link = linkDoc?.to;
  }

  if (link) {
    return {
      redirect: {
        destination: link,
        permanent: false,
      },
    };
  }
  return {
    props: {
      errorCode: 404,
    },
  };
}

export default Short;
