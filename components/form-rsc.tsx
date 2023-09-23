import Form from "@/components/form";
import { Twitter } from "@/components/icons";
import PhotoBooth from "@/components/photo-booth";
import { CountDisplay, GeneratedCount } from "./generated-count";
import { Suspense } from "react";

export default function FormRSC({
  prompt,
  pattern,
  image,
}: {
  prompt?: string;
  pattern?: string;
  image: string | null;
}) {
  return (
    <div className="z-10 w-full max-w-xl px-2.5 xl:px-0">
      <a
        href="https://stey.me/spirals-launch"
        target="_blank"
        rel="noreferrer"
        className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
      >
        <Twitter className="h-5 w-5 text-[#1d9bf0]" />
        <p className="text-sm font-semibold text-[#1d9bf0]">
          Introducing Spirals
        </p>
      </a>
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Spirals
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Generate beautiful AI spiral art with one click. Powered by{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </a>{" "}
        and{" "}
        <a
          className="text-black underline-offset-4 hover:underline"
          href="https://replicate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Replicate
        </a>
        .
      </p>
      <Form promptValue={prompt} patternValue={pattern} />
      <Suspense fallback={<CountDisplay />}>
        <GeneratedCount />
      </Suspense>
      <PhotoBooth image={image} />
    </div>
  );
}
