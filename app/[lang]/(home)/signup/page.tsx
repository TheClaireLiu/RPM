"use client";

import { showToast } from "@/components/common/Toast";
import Input from "@/components/common/Input";
import { fetchData } from "@/utils/http";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { EMAIL } from "@/constants/text";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Link from "next/link";
import useAppStore from "@/stores/appStore";
import LinkText from "@/components/common/LinkText";

function Signup() {

  const {t} = useAppStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const {msg,err} = await fetchData({url:"/api/signup",method:"POST",body:{email,password}});
    setLoading(false);

    showToast(msg || err);
    if (!err) {
      router.push("/login");
    }
  };
  return (
    <section className="auth-form">
      <h1 className="font-bold text-lg">{t('home.SignupAsALandlord')}</h1>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('home.Email')}
        value={email}
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('home.Password')}
        value={password}
      />
      <LinkText href={'/login'} text={t('home.HaveAlreadyRegister')} />
      <button
        type="submit"
        onClick={handleSignup}
        className="rounded bg-red-400 text-white p-3"
      >
        {loading ? <LoadingSpinner /> : t('home.Signup')}
      </button>
    </section>
  );
}

export default Signup;