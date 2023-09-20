"use client";

import { Download } from "lucide-react";
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

export default function PhotoBooth({
  image,
  failed,
}: {
  image: string | null;
  failed?: boolean;
}) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
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
      className="animate-fade-up opacity-0 group max-w-xl relative mx-auto mt-10 aspect-square w-full overflow-hidden rounded-2xl border border-gray-200"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      {id && image && !failed && (
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
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {downloading ? (
            <LoadingCircle />
          ) : (
            <Download className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
      {failed ? (
        <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[140px] sm:pt-[280px]">
          <p className="text-sm text-red-600">
            Failed to run – please try again!
          </p>
        </div>
      ) : !image ? (
        <div className="z-10 flex h-full w-full flex-col items-center bg-white pt-[140px] sm:pt-[280px]">
          <LoadingCircle />
          {id && (
            <div
              className="my-4 flex flex-col items-center space-y-4 animate-fade-up opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <p className="text-sm text-gray-500">
                This can take anywhere between 20s-30s to run.
              </p>
            </div>
          )}
        </div>
      ) : (
        <Image
          alt="output image"
          src={image}
          width={1280}
          height={1280}
          className="h-full object-cover"
        />
      )}
    </div>
  );
}
