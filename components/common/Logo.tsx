import useAppStore from "@/stores/appStore";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const {curLocale} = useAppStore();
  return (
    <Link href={'/'+curLocale} className="">
      <Image src={'/images/logo.png'} width={50} height={50} alt="Rental Tracker" />
    </Link>
  )
}