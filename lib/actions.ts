"use server";

import Replicate from "replicate";
import { kv } from "@vercel/kv";
import { nanoid } from "./utils";
import { WEBHOOK_URL } from "./constants";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;

  const id = nanoid();

  await Promise.all([
    kv.hset(id, {
      prompt,
    }),
    replicate.predictions.create({
      version:
        "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
      input: {
        prompt,
        qr_code_content: "https://spirals.vercel.app",
        image:
          "https://xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com/8uiaWqu-77Maq6Zn38dfz9iWwXsyaheFfOSJPL.png",
        controlnet_conditioning_scale: 1,
        qrcode_background: "white",
      },
      webhook: `${WEBHOOK_URL}?id=${id}`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  return id;
}
