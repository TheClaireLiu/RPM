import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { defaultLocale } from '@/constants/locales';
import { i18n } from '@/i18n-config';
 
let headers = { 'accept-language': 'en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
 
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/images')) return;
  if (pathname.startsWith('/favicon')) return;
  if (pathname.startsWith('/api'))  return;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => {
      return pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    }
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = match(languages, i18n.locales, defaultLocale); // -> 'en-CA'
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
 }

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    '/'
  ],
}

