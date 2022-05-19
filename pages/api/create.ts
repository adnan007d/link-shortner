// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/mongoose";
import linkSchema from "../../models/link";

type Data = {
  error: boolean;
  message: string;
  newLink?: any;
};

const checkifLink: linkChecker = (link: string) => {
  return !!link.match(
    /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB();

  const body: ILink = req.body;

  if (!body.to || !checkifLink(body.to)) {
    return res
      .status(406)
      .json({ error: true, message: "Invalid link passed" });
  }
  const newLink = await linkSchema.create({
    to: body.to,
  });
  return res.status(200).json({
    error: false,
    message: "New Short Link Created",
    newLink: { short: `${req.headers.host}/${newLink.short}` },
  });
}
