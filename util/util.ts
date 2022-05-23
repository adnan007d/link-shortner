import axios from "axios";
const checkLink = (link: string) =>
  !!link.match(
    /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
  );

const createShortLink = async (link: string) => {
  const response = await axios.post("/api/create", {
    to: link,
  });
  return response;
};

export { checkLink, createShortLink };
