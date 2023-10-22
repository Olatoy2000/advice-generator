/* eslint-disable react/no-unescaped-entities */

"use client";

import Image from "next/image";
import mobileDivider from "@/assets/images/pattern-divider-mobile.svg";
import desktopDivider from "@/assets/images/pattern-divider-desktop.svg";
import deviceImage from "@/assets/images/icon-dice.svg";
import { useQuery } from "react-query";

function generateRandomNumer(): number {
  return Math.floor(Math.random() * 224) + 1;
}

export default function Home() {
  const api = `https://api.adviceslip.com/advice/${generateRandomNumer()}`;

  const { isLoading, data } = useQuery("adviceData", async () => {
    const res = await fetch(api);
    return await res.json();
  });

  return (
    <div className="font-manrope min-h-screen p-8 bg-dark-blue flex sm:items-center pt-40 sm:pt-8 justify-center w-full text-white">
      {/* main advice box */}
      <section className="h-fit relative pt-8 flex items-center flex-col bg-dark-grayish-blue rounded-xl w-[350px] sm:w-[470px] justify-center">
        <h1 className="text-neon-green mb-6 font-semibold tracking-[3px] text-sm">
          ADVICE 200
        </h1>
        <article className="text-[28px] text-light-cyan mb-5 font-semibold text-center">
          {" "}
          "A problem shared is a problem solved"
        </article>
        <article className="mb-16">
          <Image
            src={mobileDivider}
            alt="mobile-divider"
            className="mx-auto sm:hidden"
          />
          <Image
            src={desktopDivider}
            alt="desktop-divider"
            className="hidden sm:flex"
          />
        </article>
        <button className="absolute bottom-[-30px] h-16 w-16 rounded-full bg-neon-green flex items-center justify-center cursor-pointer hover:shadow-custom-neo-glow">
          <Image src={deviceImage} alt="device image" />
        </button>
      </section>
    </div>
  );
}
