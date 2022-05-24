import linksSchema from "../models/link";

const getLink: IGetLink = async (shortId) => {
  return await linksSchema.findOne({ short: shortId });
};

const getLongLink: IGetLink = async (longLink) => {
  return await linksSchema.findOne({ to: longLink });
};

export { getLongLink };
export default getLink;
