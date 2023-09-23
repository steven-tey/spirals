import { nFormatter } from "@/lib/utils";
import { kv } from "@vercel/kv";

export async function GeneratedCount() {
  const count = await kv.dbsize();
  return <CountDisplay count={count} />;
}

export const CountDisplay = ({ count }: { count?: number }) => {
  return (
    <p
      className="mt-4 animate-fade-up text-center text-sm text-gray-500 opacity-0"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {count ? nFormatter(count) : "..."} photos generated and counting!
    </p>
  );
};
