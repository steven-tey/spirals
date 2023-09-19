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
  const image = data.image || "https://spirals.vercel.app/opengraph-image.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@steventey",
    },
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
