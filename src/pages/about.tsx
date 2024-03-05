import React from 'react';
import Image from "next/image";
import { Inter } from "next/font/google";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Header />
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/Group 1394.png"
          alt="Next.js Logo"
          width={144}
          height={78}
          priority
        />
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left ">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              FTS Team {" "}
            </h2>
            <p className={`m-0 max-w-[80ch] text-sm opacity-50 px-8`}>
              FTS 프로젝트 팀 소개
            </p>
            <h2 className={`mb-3 text-2xl font-semibold mt-8`}>
              Imgroo project {" "}
            </h2>
            <p className={`m-0 max-w-[80ch] text-sm opacity-50 px-8`}>
              커뮤니티 기반 만성 피부 질환 진단 및 케어서비스 
            </p>
      </div>

      <Footer />
    </main>
  );
}
