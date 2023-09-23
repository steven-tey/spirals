import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("id") as string;

  if (process.env.REPLICATE_WEBHOOK_SECRET) {
    // if a secret is set, verify it
    const secret = searchParams.get("secret") as string;
    if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
      return new Response("Invalid secret", { status: 401 });
    }
  }

  // get output from Replicate
  const body = await req.json();
  const { output } = body;

  if (!output) {
    return new Response("Missing output", { status: 400 });
  }

  // convert output to a blob object
  const file = await fetch(output[0]).then((res) => res.blob());

  // upload & store in Vercel Blob
  const { url } = await put(`${id}.png`, file, { access: "public" });

  await kv.hset(id, { image: url });

  return NextResponse.json({ ok: true });
}
