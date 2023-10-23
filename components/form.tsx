"use client";

import { generate } from "@/lib/actions";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import va from "@vercel/analytics";
// @ts-ignore
import promptmaker from "promptmaker";
import Image from "next/image";
import Popover from "./popover";
import { DEFAULT_PATTERN } from "@/lib/constants";
import PatternPicker from "./pattern-picker";
import { toast } from "sonner";

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
  const [openPopover, setOpenPopover] = useState(false);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > 5) {
        toast.error("File size too big (max 5MB)");
      } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
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
  };

  return (
    <form
      ref={formRef}
      className="mx-auto mt-6 flex w-full max-w-xl animate-fade-up items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 opacity-0 shadow-md sm:px-2 sm:py-4"
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
      <Popover
        content={
          <PatternPicker
            setPattern={setPattern}
            setOpenPopover={setOpenPopover}
          />
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          type="button"
          onClick={() => setOpenPopover((prev) => !prev)}
          className="cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-100 active:bg-gray-200 sm:p-2"
        >
          <Image
            src={pattern}
            alt="Pattern"
            width={50}
            height={50}
            className="h-4 w-4 sm:h-5 sm:w-5"
            unoptimized
          />
        </button>
      </Popover>
      <input
        id="patternFile"
        name="patternFile"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onChangePicture}
      />
      <textarea
        id="prompt"
        name="prompt"
        ref={textareaRef}
        value={prompt}
        autoFocus
        autoComplete="off"
        placeholder={placeholderPrompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholderPrompt);
            e.preventDefault();
          }
          onKeyDown(e);
        }}
        className="flex-1 resize-none outline-none"
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
        "group rounded-lg p-2.5",
        pending
          ? "cursor-disabled bg-gray-100"
          : "transition-all hover:bg-gray-100 active:bg-gray-200",
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
