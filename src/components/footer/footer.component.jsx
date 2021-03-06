import React from "react";
import { SiLinkedin, SiGithub, SiTwitter } from "react-icons/si";

const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-10">
      <div className="text-xs md:text-sm text-center">create by</div>
      <div className="text-xs md:text-sm flex justify-center font-black gap-x-1">
        <a
          href="https://www.linkedin.com/in/weike-shi/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ weike shi
        </a>
        <SiLinkedin />
      </div>
      <div className="text-xs md:text-sm flex justify-center font-black gap-x-1">
        <a
          href="https://github.com/WeikeShi0730/lights-out-firebase"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ github
        </a>
        <SiGithub />
      </div>
      <div className="text-xs md:text-sm text-center flex justify-center font-black gap-x-1">
        <a
          href="https://twitter.com/vicshi97"
          rel="noopener noreferrer"
          target="_blank"
        >
          @ twitter
        </a>
        <SiTwitter />
      </div>
    </div>
  );
};

export default Footer;
