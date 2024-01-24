/* eslint-disable camelcase */
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Noto_Sans_Mono } from 'next/font/google';
import { Suspense } from 'react';
import NextTopLoader from 'nextjs-toploader';
import Navbar from '../components/Navbar';
import './styles/globals.css';
import Footer from '../components/Footer';
import { FavoriteContextProvider } from '../context/FavoriteContext';

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F9F9' },
    { media: '(prefers-color-scheme: dark)', color: '#F9F9F9' },
  ],
};

export const metadata = {
  metadataBase: new URL('https://archiwumkulinarne.deadbrain.dev'),
  alternates: {
    canonical: `/`,
  },
  title: {
    default: 'strona główna | archiwum kulinarne',
    template: '%s | archiwum kulinarne',
  },
  description: 'zdigitalizowane rodzinne przepisy kulinarne',

  // OG
  openGraph: {
    title: 'strona główna | archiwum kulinarne',
    siteName: 'archiwum kulinarne',
    url: '/',
    images: [
      {
        url: 'https://archiwumkulinarne.deadbrain.dev/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  // end OG

  // ICONS
  icons: {
    // icon: '/icons/favicon.ico',
    icon: '/icons/favicon.jpg',
    shortcut: '/icons/apple-icon-180.png',
    apple: '/icons/apple-icon-180.png',
  },
  appleWebApp: {
    title: 'archiwum kulinarne',
    startupImage: [
      {
        url: '/icons/apple-splash-2048-2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2732-2048.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1668-2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2388-1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1536-2048.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2048-1536.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1668-2224.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2224-1668.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1620-2160.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2160-1620.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1284-2778.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2778-1284.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1170-2532.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2532-1170.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1125-2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2436-1125.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1242-2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2688-1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-828-1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-1792-828.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-1242-2208.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-2208-1242.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-750-1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-1334-750.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
      {
        url: '/icons/apple-splash-640-1136.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/icons/apple-splash-1136-640.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
      },
    ],
  },
  category: 'food',
  // creator: 'deadbrain.dev',
  // authors: [{ name: 'deadbrain.dev' }],
  publisher: 'deadbrain.dev',
  keywords: [
    'jedzenie',
    'przepisy',
    'rodzinne przepisy',
    'dziedzictwo kulinarne',
    'gotowanie w domu',
    'tradycyjne smaki',
    'gotowanie z miłością',
    'przepisy pokoleniowe',
    'domowa kuchnia',
    'kulinarne wspomnienia',
    'gotowanie dziedzictwa',
    'tradycyjne dania',
  ],
  manifest: '/manifest.json',
};
const notosansmono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
  display: 'swap',
});

function SearchBarFallback() {
  // TODO zrobic placeholder navbaru
  return <header className="navBar" />;
}
export default function RootLayout({ children }) {
  return (
    <html lang="pl-PL" className={notosansmono.className}>
      <head>
        <meta
          name="google-site-verification"
          content="7mdHHlF-tsekFeuaqBWffIcvR3E8pf-VRP8qwqATJ0c"
        />
      </head>
      <FavoriteContextProvider>
        <body>
          <Suspense fallback={<SearchBarFallback />}>
            <Navbar />
          </Suspense>
          <main className="container">
            <NextTopLoader
              color="#ffce06"
              height={8}
              speed={1600}
              showSpinner={false}
              zIndex={1600}
              // crawl
              // crawlSpeed={2000}
              shadow={false}
              easing="ease-in"
              initialPosition={0.1}
              showAtBottom={false}
            />
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </FavoriteContextProvider>
    </html>
  );
}
