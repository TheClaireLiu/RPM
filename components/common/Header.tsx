"use client";
import Logo from "@/components/common/Logo";
import LangSwitch from "@/components/common/LangSwtich";
import LinkText from "@/components/common/LinkText";
import useUserStore from "@/stores/userStore";
import useAppStore from "@/stores/appStore";

export default function Header() {
  const {loginUser} = useUserStore();
  const {t} = useAppStore();
  return (
    <header className="p-4 shadow flex justify-between items-center">
      <Logo />
      <nav className="flex gap-3">
        {loginUser._id ? 
        <LinkText href="/dashboard" text={t('home.Dashboard')}/> :
        <>
          <LinkText href={"/signup"} text={t('home.Signup')} />
          <LinkText href={"/login"} text={t('home.Login')} />
        </>
        }
        <LangSwitch />
      </nav>
    </header>
  );
}