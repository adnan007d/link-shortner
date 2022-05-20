import React, { FormEventHandler, useState } from "react";
import DuplicateIcon from "../assets/duplicate.svg";
import axios from "axios";

const Noob = () => {
  const [link, setLink] = useState<string>("");
  const [shortLink, setShortLink] = useState<string>("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const _link = link.trim();
    if (!_link) return alert("Link Cannot be empty");
    if (
      !!!_link.match(
        /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
      )
    )
      return alert("Invalid Link");
    try {
      const response = await axios.post("/api/create", {
        to: _link,
      });
      setShortLink(response.data.newLink.short || "");
    } catch (e) {
      return alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center mt-[20vh]">
      <form className="flex flex-col space-y-5" onSubmit={onSubmit}>
        <input
          type="text"
          name="link"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="bg-transparent border-b-stone-300 border-b outline-none "
          placeholder="Enter Link To Shorten"
        />
        <button
          className="bg-[#222] rounded-lg disabled:bg-[#333] disabled:text-gray-400"
          type="submit"
          disabled={!link.trim()}
        >
          Create
        </button>
        {shortLink && (
          <div className="flex items-center justify-between">
            <span className="flex-1">{shortLink}</span>
            <DuplicateIcon
              className="h-5 cursor-pointer"
              onClick={() => navigator.clipboard.writeText(shortLink)}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Noob;
