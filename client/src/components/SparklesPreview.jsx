import React from "react";
import { SparklesCore } from "./ui/sparkles";

export default function SparklesPreview() {
  return (
    <div className="h-[20rem] md:h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md relative border-4 border-rose-500/50 shadow-2xl">
      <h1 className="md:text-7xl text-4xl lg:text-9xl font-bold text-center text-white relative z-20 font-fantasy px-4">
        Rose Day
      </h1>
      <div className="w-full max-w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-[2px] w-[80%] blur-sm" />
        <div className="absolute inset-x-[10%] top-0 bg-gradient-to-r from-transparent via-rose-500 to-transparent h-px w-[80%]" />
        <div className="absolute inset-x-[30%] top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[5px] w-[40%] blur-sm" />
        <div className="absolute inset-x-[30%] top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-[40%]" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
