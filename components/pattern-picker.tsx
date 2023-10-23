import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const patterns = [
  "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/8uiaWqu-77Maq6Zn38dfz9iWwXsyaheFfOSJPL.png",
  "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/vercel-RaEAI0uDphGrSl0a7lCcNhdKO7dNKT.png",
  "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/react-58b3JHEzb6qWG20KYl944yW7V72CGo.png",
  "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/logo-wfAh7QadApCiJ1tu7EVOsILwGBQ1wz.png",
];

export default function PatternPicker({
  setPattern,
  setOpenPopover,
}: {
  setPattern: Dispatch<SetStateAction<string>>;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}) {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="w-full overflow-auto md:max-w-xl">
      <div className="p-4">
        <p className="py-2 font-display text-xl text-gray-700">
          Choose a pattern
        </p>
        <div className="grid grid-cols-4 gap-3">
          {patterns.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPattern(p);
                setOpenPopover(false);
              }}
              className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-500"
            >
              <Image
                src={p}
                alt={p}
                width={400}
                height={400}
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300" />
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <p className="font-display text-xl text-gray-700">Upload your own</p>
          <p className="py-2 text-sm text-gray-500">
            Recommended: Square (1:1) ratio, with a black and white color
            scheme. You can also drag and drop an image here.
          </p>
        </div>
        <label
          htmlFor="patternFile"
          className="group relative mt-1 flex aspect-square h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:border-gray-500 hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
              const file = e.dataTransfer.files && e.dataTransfer.files[0];
              if (file) {
                if (file.size / 1024 / 1024 > 5) {
                  toast.error("File size too big (max 5MB)");
                } else if (
                  file.type !== "image/png" &&
                  file.type !== "image/jpeg"
                ) {
                  toast.error("File type not supported (.png or .jpg only)");
                } else {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setPattern(e.target?.result as string);
                    setOpenPopover(false);
                  };
                  reader.readAsDataURL(file);
                }
              }
            }}
          />
          <div
            className={`${
              dragActive
                ? "cursor-copy border-2 border-gray-600 bg-gray-50 opacity-100"
                : ""
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md bg-white`}
          >
            <UploadCloud
              className={`${
                dragActive ? "scale-110" : "scale-100"
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            />
            <span className="sr-only">Pattern upload</span>
          </div>
        </label>
      </div>
    </div>
  );
}
