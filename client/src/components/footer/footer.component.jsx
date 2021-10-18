import React from "react";

const Footer = () => {
  return (
    <div className="m-6 mt-12">
      <div className="text-xs md:text-sm text-center">
        create by{" "}
        <a
          className="flex justify-center items-center font-black"
          href="https://www.linkedin.com/in/weike-shi/"
        >
          @ weike shi
          <img src="/icons8-linkedin-24.png" alt="linkedin" />
        </a>
      </div>
      <div className="text-xs md:text-sm">
        <a
          className="flex justify-center items-center font-black"
          href="https://github.com/WeikeShi0730/lights-out-node"
        >
          @ github
          <img src="/icons8-github-24.png" alt="github" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
