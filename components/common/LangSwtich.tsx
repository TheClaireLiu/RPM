"use client";

import { locales } from "@/constants/locales";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LangSwitch() {
  const curPath = usePathname();

  return (
    <ul className="flex gap-2">
      <Link href="/en-CA">EN</Link>
      <Link href="/zh-CN">中文</Link>
    </ul>
  );
}
