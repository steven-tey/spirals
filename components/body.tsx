import Form from "@/components/form";
import { Twitter } from "@/components/icons";
import PhotoBooth from "@/components/photo-booth";
// @ts-ignore
import promptmaker from "promptmaker";

export default function Body({
  prompt,
  image,
}: {
  prompt?: string;
  image: string | null;
}) {
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <a
        href="https://twitter.com/steventey/status/1613928948915920896"
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
        className="animate-fade-up [text-wrap:balance] bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Spirals
      </h1>
      <p
        className="mt-6 animate-fade-up [text-wrap:balance] text-center text-gray-500 opacity-0 md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Generate beautiful AI spiral art with one click. Powered by Vercel and
        Replicate.
      </p>
      <div
        className="mt-6 animate-fade-up opacity-0"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Form
          promptValue={prompt}
          placeholderPrompt={prompt ? "" : promptmaker()}
        />
      </div>
      {/* Glacier: https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/WtIReq2-O4vy1seGuJ7qCYne82U0QDxbbugFXW.png */}
      <PhotoBooth image={image} />
    </div>
  );
}
