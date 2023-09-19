import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";
import Body from "@/components/body";

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
