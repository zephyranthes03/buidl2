import React from 'react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Footer: React.FC = () => {
  return(
    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://github.com/zephyranthes03/buidl2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Support by FTS project team.
      </a>
  </div>
  );
};