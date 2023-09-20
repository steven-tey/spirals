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

export default function Form({ promptValue }: { promptValue?: string }) {
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
