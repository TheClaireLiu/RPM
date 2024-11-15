'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAppStore from '@/stores/appStore';

export default function ForgotPassword() {
  const {t} = useAppStore();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    console.log("email==================: ",email);
    const data = await response.json();

    if (response.ok) {
      setMessage('Verification code sent to your email.');
      // 跳转到 reset password 页面
      router.push('/reset');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
  
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {t('home.ForgotPassword')}?
      </h2>
      <p className="text-gray-600 text-center">
        {t('home.DontWorry')}
      </p>
      <input
        type="email"
        placeholder={t('home.Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        {t('home.ResetPassword')}
      </button>
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </form>

  );
}

