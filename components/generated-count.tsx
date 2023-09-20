import { nFormatter } from "@/lib/utils";
import { kv } from "@vercel/kv";

export async function GeneratedCount() {
  const count = await kv.dbsize();
  return <CountDisplay count={count} />;
}

export const CountDisplay = ({ count }: { count?: number }) => {
  return (
    <p
      className="animate-fade-up opacity-0 mt-4 text-center text-sm text-gray-500"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {count ? nFormatter(count) : "..."} photos generated and counting!
    </p>
  );
};
