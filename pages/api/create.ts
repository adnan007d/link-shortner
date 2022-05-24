// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../config/mongoose";
import { getLongLink } from "../../controller/getLink";
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

  if (!body.to || !checkifLink(body.to.trim())) {
    return res
      .status(406)
      .json({ error: true, message: "Invalid link passed" });
  }

  let _to = body.to.trim();

  if (_to.endsWith("/")) _to = _to.substring(0, _to.length - 1);

  const cachedLink = await getLongLink(_to);

  let newLink = cachedLink;
  if (!cachedLink)
    newLink = await linkSchema.create({
      to: _to,
    });
  return res.status(200).json({
    error: false,
    message: "New Short Link Created",
    newLink: { short: `${req.headers.host}/${newLink?.short}` },
  });
}
