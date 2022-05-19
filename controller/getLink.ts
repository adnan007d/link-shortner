import linksSchema from "../models/link";

const getLink: IGetLink = async (shortId) => {
  return await linksSchema.findOne({ short: shortId });
};

export default getLink;
