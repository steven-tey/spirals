"use server";

import Replicate from "replicate";
import { kv } from "@vercel/kv";
import { nanoid } from "./utils";
import { DEFAULT_PATTERN, WEBHOOK_URL } from "./constants";
import { put } from "@vercel/blob";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const prompt = form.get("prompt") as string;
  let patternUrl = form.get("patternUrl") as string;
  const patternFile = form.get("patternFile") as File;
  if (patternFile.size > 0) {
    const response = await put(patternFile.name, patternFile, {
      access: "public",
    });
    patternUrl = response.url;
  }

  const id = nanoid();

  const res = await Promise.all([
    kv.hset(id, {
      prompt,
      ...(patternUrl && { pattern: patternUrl }),
    }),
    replicate.predictions.create({
      version:
        "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
      input: {
        prompt,
        qr_code_content: "https://spirals.vercel.app",
        image: patternUrl,
        controlnet_conditioning_scale: 1,
        qrcode_background: "white",
      },
      webhook: `${WEBHOOK_URL}?id=${id}${
        process.env.REPLICATE_WEBHOOK_SECRET
          ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
          : ""
      }`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  console.log(res);

  return id;
}
