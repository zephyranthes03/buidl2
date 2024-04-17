import React from 'react';
import Image from "next/image";
import Link from 'next/link'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const Header: React.FC = () => {
  return(
    <header>
    <div className="fixed top-8 left-0 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none font-mono">

    {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"> */}
    <Link href="/">
    <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
      src="/Group 1395.png"
      alt="Imgroo Logo"
      width={93}
      height={26}
      priority
    />
    </Link>
      {/* <code className="font-mono font-bold">src/pages/index.tsx</code>
    </p> */}
    {/* <div className="fixed bottom-0 left-3 flex h-12 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <a
        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hosting by vercel
      </a>
    </div> */}
  </div>
  </header>
  );
};
