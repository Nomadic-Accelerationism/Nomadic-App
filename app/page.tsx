"use client";

import Image from "next/image";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import HeaderComponent from "@/components/header";

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
      <>
        <HeaderComponent />
      </>
    )}
    </>
  );
}
