"use client";

import { generate } from "@/lib/actions";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import { Pencil, SendHorizonal } from "lucide-react";
import { useRef, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoadingCircle } from "./icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Form({
  promptValue,
  placeholderPrompt,
}: {
  promptValue?: string;
  placeholderPrompt: string;
}) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [prompt, setPrompt] = useState(promptValue || "");
  const [readOnly, setReadOnly] = useState(promptValue ? true : false);
  const { formRef, onKeyDown } = useEnterSubmit();
  return (
    <form
      ref={formRef}
      className={cn(
        "rounded-lg bg-white p-4 border border-gray-200 shadow-md w-full max-w-xl mx-auto flex space-x-2 items-center",
        readOnly && "bg-gray-50"
      )}
      action={(data) => {
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
        readOnly={readOnly}
        placeholder={placeholderPrompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholderPrompt);
            e.preventDefault();
          }
          onKeyDown(e);
        }}
        className={cn(
          "flex-1 outline-none resize-none",
          readOnly && "text-gray-600 bg-gray-50"
        )}
      />
      {readOnly ? (
        <button
          className="rounded-lg group p-2 hover:bg-gray-100 active:bg-gray-200 transition-all"
          onClick={() => {
            setReadOnly(false);
            textareaRef.current?.select();
          }}
        >
          <Pencil className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      ) : (
        <SubmitButton />
      )}
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
