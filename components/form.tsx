"use client";

import { generate } from "@/lib/actions";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import { SendHorizonal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import va from "@vercel/analytics";
// @ts-ignore
import promptmaker from "promptmaker";
import Image from "next/image";
import { toast } from "sonner";
import Tooltip from "./tooltip";
import { DEFAULT_PATTERN } from "@/lib/constants";

export default function Form({
  promptValue,
  patternValue,
}: {
  promptValue?: string;
  patternValue?: string;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(promptValue || "");
  const [placeholderPrompt, setPlaceholderPrompt] = useState("");
  useEffect(() => {
    if (promptValue) {
      setPlaceholderPrompt("");
    } else {
      setPlaceholderPrompt(promptmaker());
    }
  }, [promptValue]);

  const { formRef, onKeyDown } = useEnterSubmit();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (promptValue && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [promptValue]);

  const [pattern, setPattern] = useState(patternValue || DEFAULT_PATTERN);

  const handleUpload = (file: File | null) => {
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        toast.error("Invalid file type (must be .png, .jpg, or .svg)");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPattern(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <form
      ref={formRef}
      className="rounded-lg bg-white p-4 mt-6 animate-fade-up opacity-0 border border-gray-200 shadow-md w-full max-w-xl mx-auto flex space-x-2 items-center"
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      action={(data) => {
        va.track("generate prompt", {
          prompt: prompt,
        });
        generate(data).then((id) => {
          router.push(`/t/${id}`);
        });
      }}
    >
      <input className="hidden" name="patternUrl" value={pattern} readOnly />
      <Tooltip
        content={
          <div className="max-w-xs p-4 text-center text-sm text-gray-700 flex flex-col items-center justify-center space-y-4">
            <Image
              src="/logo.png"
              alt="Default Pattern"
              width={200}
              height={200}
              className="h-40 w-40"
            />
            <p>
              You can upload a custom pattern. <br /> For optimal results, we
              recommend a square image with a white background and a black
              foreground.
            </p>
          </div>
        }
      >
        <label
          htmlFor="patternFile"
          className="cursor-pointer rounded-md p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <Image
            src={pattern}
            alt="Pattern"
            width={50}
            height={50}
            className="h-5 w-5"
          />
        </label>
      </Tooltip>
      <input
        id="patternFile"
        name="patternFile"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.currentTarget.files && e.currentTarget.files[0];
          handleUpload(file);
        }}
      />
      <textarea
        id="prompt"
        name="prompt"
        ref={textareaRef}
        value={prompt}
        autoFocus
        placeholder={placeholderPrompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholderPrompt);
            e.preventDefault();
          }
          onKeyDown(e);
        }}
        className="flex-1 outline-none resize-none"
      />
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "rounded-lg group p-2",
        pending
          ? "cursor-disabled bg-gray-100"
          : "hover:bg-gray-100 active:bg-gray-200 transition-all"
      )}
      disabled={pending}
    >
      {pending ? (
        <LoadingCircle />
      ) : (
        <SendHorizonal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      )}
    </button>
  );
};
