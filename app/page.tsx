"use client";

import Image from "next/image";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import HeaderComponent from "@/components/header";
import Link from "next/link";

export default function Home() {

  const { isAuthenticated } = useDynamicContext();

  return (
    <>
    {!isAuthenticated && (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white border rounded-lg shadow-md">
        <img src="/nacc-logo.png" alt="Logo" className="w-40 h-40 mb-6" />
        <h1 className="mb-2 text-4xl font-bold">n/acc</h1>
        <p className="mb-8 text-lg text-muted-foreground">nomadic accelerationism</p>
          <DynamicWidget />
        {/* <Button className="w-full max-w-xs py-2 text-lg bg-[#f26522] text-white rounded-full">Connect wallet</Button> */}
        <p className="mt-8 text-xs text-muted-foreground">v.0.01a</p>
      </div>
    )}
    {isAuthenticated && (
      <div className="">
        <HeaderComponent />

        <main className="flex flex-col items-center w-full max-w-md p-4 space-y-4 min-h-max">

          <Link className="w-full" href="/proof">
            <div className="flex items-center justify-between w-full py-4 px-14 border rounded-md h-24 hover:bg-[#f26522]">
              <h2 className="text-xl font-bold">My zkProofs</h2>
              <Image 
                src={"/zkProof.png"} 
                alt="zkProof" 
                width={60}
                height={60}
                style={{ margin: 'auto' }}
              />
            </div>
          </Link>

          <Link className="w-full" href="/journey">
            <div className="flex items-center justify-between w-full py-4 px-14 border rounded-md h-24 hover:bg-[#f26522]">
              <h2 className="text-xl font-bold">My Journeys</h2>
              <Image 
                src={"/journeys.png"} 
                alt="Journeys" 
                width={60}
                height={60}
                style={{ margin: 'auto' }}
              />
            </div>
          </Link>

          <Link className="w-full" href="/houses">
            <div className="flex items-center justify-between w-full py-4 px-14 border rounded-md h-24 hover:bg-[#f26522]">
              <h2 className="text-xl font-bold mr-1">My Hacker Houses</h2>
              <Image 
                src={"/houses.png"} 
                alt="Houses" 
                width={60}
                height={60}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          </Link>

          <Link className="w-full" href="/collateral">
            <div className="flex items-center justify-between w-full py-4 px-14 border rounded-md h-24 hover:bg-[#f26522]">
              <h2 className="text-xl font-bold">My Collateral</h2>
              <Image 
                src={"/collateral.png"} 
                alt="Collateral" 
                width={60}
                height={60}
                style={{ margin: 'auto' }}
              />
            </div>
          </Link>          

        </main>

        {/* <footer className="mt-auto p-4">
          <p>v.0.01a</p>
        </footer> */}

        </div>

    )}
    </>
  );
}
