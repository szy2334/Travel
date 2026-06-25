import { Mountain } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 text-[#173d33]">
      <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#3f9c6f]/40 bg-[#fff8df] text-[#0d6f67] shadow-sm">
        <Mountain className="h-6 w-6" />
      </span>
      <span>
        <span className="block font-serif text-xl tracking-[0.04em] text-[#173d33]">中国5A景区探索</span>
        <span className="block text-xs uppercase tracking-[0.24em] text-[#3d695c]">China 5A Scenic Explorer</span>
      </span>
    </Link>
  );
}
