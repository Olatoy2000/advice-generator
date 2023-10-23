/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import mobileDivider from "@/assets/images/pattern-divider-mobile.svg";
import desktopDivider from "@/assets/images/pattern-divider-desktop.svg";
import deviceImage from "@/assets/images/icon-dice.svg";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

type SlipData = {
  slip: {
    id: number;
    advice: string;
  };
};
function generateRandomNumer(): number {
  return Math.floor(Math.random() * 224) + 1;
}

export default function Home() {
  const api = `https://api.adviceslip.com/advice/${generateRandomNumer()}`;

  const [isFetched, setFetched] = useState(true);

  const { isLoading, data, refetch } = useQuery<SlipData>(
    "adviceData",
    async () => {
      const res = await fetch(api);
      return await res.json();
    },
    { enabled: isFetched }
  );

  useEffect(() => {
    setFetched(false);
  }, []);

  function handleRefetch() {
    refetch();
  }

  return (
    <div className="font-manrope min-h-screen p-8 bg-dark-blue flex sm:items-center pt-40 sm:pt-8 justify-center w-full text-white">
      {/* main advice box */}
      <section className="h-fit relative pt-8 flex items-center flex-col bg-dark-grayish-blue rounded-xl w-[350px] sm:w-[470px] justify-center">
        <h1 className="text-neon-green mb-6 font-semibold tracking-[3px] text-sm">
          ADVICE {data?.slip.id}
        </h1>
        <article className="text-[28px] text-light-cyan mb-5 font-semibold text-center min-[100px]">
          {isLoading ? "Loading..." : <h2>"{data?.slip.advice}"</h2>}
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
        <button
          onClick={handleRefetch}
          className="absolute bottom-[-30px] h-16 w-16 rounded-full bg-neon-green flex items-center justify-center cursor-pointer hover:shadow-custom-neo-glow"
        >
          <Image src={deviceImage} alt="device image" />
        </button>
        {/*  rel="noopener noreferrer" */}
      </section>
    </div>
  );
}
