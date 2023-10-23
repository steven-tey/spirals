"use client";

import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/icons";
import { useParams, useRouter } from "next/navigation";
import va from "@vercel/analytics";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PhotoBooth({ image }: { image: string | null }) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!image) {
      interval = setInterval(() => {
        router.refresh();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [image, router]);

  return (
    <div
      className="group relative mx-auto mt-6 aspect-square w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-gray-200 opacity-0"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      {id && image && (
        <div className="absolute right-5 top-5 z-10 flex space-x-2">
          <button
            onClick={() => {
              setCopying(true);
              va.track("copy image", {
                image,
                page: `https://spirals.vercel.app/t/${id}`,
              });
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  navigator.clipboard.write([
                    new ClipboardItem({
                      "image/png": blob,
                    }),
                  ]);
                  setCopying(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <button
            onClick={() => {
              setDownloading(true);
              va.track("download image", {
                image,
                page: `https://spirals.vercel.app/t/${id}`,
              });
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  forceDownload(blobUrl, `${id || "demo"}.png`);
                  setDownloading(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {downloading ? (
              <LoadingCircle />
            ) : (
              <Download className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      )}
      {image ? (
        <Image
          alt="output image"
          src={image}
          width={1280}
          height={1280}
          className="h-full object-cover"
          unoptimized
        />
      ) : (
        <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[140px] sm:pt-[280px]">
          <LoadingCircle />
          {id && (
            <div
              className="my-4 flex animate-fade-up flex-col items-center space-y-4 opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <p className="text-sm text-gray-500">
                This can take anywhere between 20s-30s to run.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
