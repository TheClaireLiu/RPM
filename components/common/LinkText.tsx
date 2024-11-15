import useAppStore from "@/stores/appStore";
import Link from "next/link";

interface LinkTextProps {
  href: string;
  text: string;
  className?: string;
}

export default function LinkText({ href, text, className }: LinkTextProps) {
  const {curLocale} = useAppStore();
  return <Link className={`${className || 'link'}`} href={`/${curLocale}${href}`}>{text}</Link>;
}
