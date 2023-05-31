import Recipes from '../../components/Recipes';

export const metadata = {
  // metadataBase: new URL('https://archiwumkulinarne.deadbrain.dev'),
  metadataBase: new URL('https://archiwum-kulinarne.vercel.app'),
  title: 'spis przepisów | archiwum kulinarne',

  description: 'zdigitalizowane rodzinne przepisy kulinarne',

  // OG
  openGraph: {
    title: 'spis przepisów',
    siteName: 'archiwum kulinarne SITE NAME?',
    url: '/przepisy',
    images: [
      {
        url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
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
    icon: '/icons/favicon.ico',
    shortcut: '/icons/apple-icon-180.png',
    apple: '/icons/apple-icon-180.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

const Page = async () => <Recipes />;

export default Page;
