// import Link from 'next/link';
// import Head from 'next/head';

import ReactQueryWrapper from './ReactQueryWrapper';
import Navbar from '../components/Navbar';
// import styles from './styles/Homepage.module.css';
import './styles/globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'archiwum kulinarne',
    template: '%s | archiwum kulinarne',
  },
  description: 'zdigitalizowane rodzinne przepisy kulinarne',
  openGraph: {
    title: 'archiwum kulinarne',
    url: 'https://archiwumkulinarne.deadbrain.dev/',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/fife/APg5EOYBTTSJX-_lcjSVYjREyPCTH7--vis8oeVGXSDG3gO_jNEVc9xHFXT3ECinncmG8jt8KBo6C0U4M8Up7FFsjN9Wvu7sY5A6GzdYiUyCw0eMf1eF-Y1Wnar-jcyuSamr36wRzRoKaIgwrKU6dxr46XN8IPaIw5BGw0lQQBiImvgpKQUDF4me4hmqa6UeO6otH8gIptXszi8mF_YaoAmYA2swRttSeBoS31KHPMzPsPvOtw8XH9rdfb7xBLEDxUpsfdjAuySkc4qfGG-A6nwihrB8LrzT60yDndtbNxcIJh1WJxTmPbuqZoPT8R0wzbxCYe59L58TlqDSFz8zTURa1fFClfcVWvmLUBnTCj6me0SqrB-3zzBCe94Zn9EEXW1OCG6M1VdD0lOCqxXwTNYFCbm6KYkS5NndTlkRegjv21fy4UTWtkBi0yX2a4AO8NiDTYwlqF1wZ9ESSP30S4zs_Y97IujemTyi1jQtY_-bjE26Z9x3tn41oQ5omXftxYFX04lvYJU47BYK4xbNjvdp3qq2kF-SN0T8eIy7Y_BAnvVU6bGl3XVtcThlTsOh5lGFuGqicmA6eHp0UGg9fEFdBmhRcNnSZuS3hS2ocqjVkN52zTP5nDwPGsH0avjycOYkOmKPRUL6Lqc3XS-hQ-dpK3CSz6_aqidegHlpEuUjkkHE4rt5jsV7u7TenODkMjdTJXgQXjOwek6EbxumWtUmRdH2fVU--G-BIQOpIYJLDLZmJd94vTFT0fx7LEhat-Ot_m-XBCoH-AHq3fvjjy5gwkdq41v2wL6mDpxlEiizqRJxl4_Cl1kfkQc-VjZS0U59wiUmgJnyQgr3wIqxn1JjTkAbYxUkbHY4wd4okxXR0SiOuV2ZdZ6G-1AS7mh1vlxMkYxysW-WRm4MuqW09bz6yNf6MKOCVIxRyu3SDcuIpYqnAC8_mciTOJ1GzQIgQc1oh00wjWDQ1ogtBJ03f-3WkL6k9p4WNpNYisucXqTacaqp9v-mwPF7fysSHPmIyDeW9E8jMAyWO1UFTm_wlYEWCRMVDB-Gl_CF4WDjvxIH-Q_sExGevue5EwvZnk_aqgK17ma2G-PwqYo8c9NikrB2D-CYC_ZXMaqHI6zbCtt4qCJv3NACMfHwyOxjVU2C0oTOHfYJMFyH9qoYIBnwsn0m93o_do1RxXmGa1iwZRoIZD-1STRvWja-3kB_F1CuvMvtQpK4jHTDkFmRB9N3Iv705urrcn83TCVFeDi9W25cL6PCR_oNp1UUOKHTkqDf-5D2bUQeyojc4Xi7Y13kW3S4cIVTu48uDmzBsgiE0CU2UniW1Xs3usVIYFLFxc_K4iEBDg30tmzTgTDOrOf_Frca4ETy8-ne5YbSARvjFTBbLMlDQ8fnvm29FQtWzcs6_2otw0fKVci_nyrx6LtpCycgV8_dRjS1vYhPT081EY1pQACU-ionwQoChe43j1f6bnxFCjg_gXB33Ia_gWRLGsCY-A9Ot_IaWf5qkURrnI2zTf8M-n9LjHVpfaVbYJHMLg=w4850-h2400',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: 'icons/apple-icon-180.png',
    apple: 'icons/apple-icon-180.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
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
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <div className="content">
          <Navbar />
          <div className="container">
            <ReactQueryWrapper>{children}</ReactQueryWrapper>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
