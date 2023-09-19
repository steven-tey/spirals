import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("id") as string;

  // get output from Replicate
  const body = await req.json();
  const { output } = body;

  // convert output to a blob object
  const file = await fetch(output[0]).then((res) => res.blob());

  // upload & store in Vercel Blob
  const { url } = await put(`${id}.png`, file, { access: "public" });

  await kv.hset(id, { image: url });

  return NextResponse.json({ ok: true });
}
