import RedditIcon from "@mui/icons-material/Reddit";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer className="h-60 mt-10 bg-black w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-white mb-5">You can Contact me here</h1>
        <div className="flex space-x-10">
          <a
            target="_blank"
            href="https://www.reddit.com/user/AnEternityOfMisery"
          >
            <RedditIcon className="text-red-500 icon" />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/an.eternity.of.misery"
          >
            <InstagramIcon className="text-[#bc2a8d] icon" />
          </a>
          <a target="_blank" href="https://github.com/adnan007d">
            <GitHubIcon className="text-white icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
