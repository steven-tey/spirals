import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import Body from "@/components/body";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata | undefined> {
  const data = await kv.hgetall<{ prompt: string; image?: string }>(params.id);
  if (!data) {
    return;
  }

  const title = `Spirals: ${data.prompt}`;
  const description = `A spiral generated from the prompt: ${data.prompt}`;

  return {
    title,
    description,
  };
}

export default async function Results({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await kv.hgetall<{ prompt: string; image?: string }>(params.id);
  console.log(data);
  if (!data) {
    notFound();
  }
  return <Body prompt={data.prompt} image={data.image || null} />;
}
