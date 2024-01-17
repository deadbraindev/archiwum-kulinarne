import Recipes from '../../components/Recipes';

export const metadata = {
  metadataBase: new URL('https://archiwumkulinarne.deadbrain.dev'),
  alternates: {
    canonical: `/przepisy`,
  },
  title: 'spis przepisów | archiwum kulinarne',

  description: 'zdigitalizowane rodzinne przepisy kulinarne',

  // OG
  openGraph: {
    title: 'spis przepisów | archiwum kulinarne',
    siteName: 'archiwum kulinarne',
    url: '/przepisy',
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
  // icons: {
  //   icon: '/icons/favicon.ico',
  //   shortcut: '/icons/apple-icon-180.png',
  //   apple: '/icons/apple-icon-180.png',
  // },
};

export default function Page() {
  return <Recipes />;
}
