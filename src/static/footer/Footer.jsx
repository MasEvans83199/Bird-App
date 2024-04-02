import React from "react";
import { Link } from "react-router-dom";
import GitDark from "../../assets/github-mark.png";
import GitLight from "../../assets/github-mark-white.png";
import { 
  Typography, 
  IconButton,
  Card,
  CardBody,
} from "@material-tailwind/react";

const links = [
  { text: "About Us", url: "/about" },
  { text: "Contact Us", url: "/contact" },
];

const current_year = new Date().getFullYear();

function Footer() {
  return (
    <Card className="mt-4 shadow-lg border-t dark:bg-blue-gray-800 dark:border-blue-gray-700">
      <CardBody>
        <footer className="px-8">
          <div className="container mx-auto">
            <div className="mt-8 grid items-center justify-center">
              <ul className="flex flex-wrap justify-center gap-8 items-center">
                {links.map((link, idx) => (
                  <li key={link.text}>
                    <Link key={link.url} to={link.url}>
                    <Typography
                      className={`py-1 font-normal text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400 ${
                        idx === links.length - 1 ? "pl-2" : "px-2"
                      }`}
                    >
                      {link.text}
                    </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="gap-2 lg:flex items-center justify-center">
                <a href="https://github.com/MasEvans83199/Bird-App" target="_blank" rel="noopener noreferrer">
                  <IconButton className="my-2 rounded bg-amber-900 hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10 dark:bg-gray-300 dark:hover:shadow-gray-200/10 dark:focus:shadow-gray-200/20">
                    <img className="dark:hidden" src={GitLight} alt="GitHub Light Icon" />
                    <img className="hidden dark:block" src={GitDark} alt="GitHub Dark Icon" />
                  </IconButton>
                </a>
              </div>
              <Typography className="text-center font-normal text-gray-700 dark:text-gray-300">
                &copy; {current_year} Beak to Basics™. All Rights Reserved.
              </Typography>
            </div>
          </div>
        </footer>
      </CardBody>
    </Card>
  );
}

export default Footer;