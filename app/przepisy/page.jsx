import Recipes from './Recipes';

export const metadata = {
  title: 'spis przepisów',
  openGraph: {
    title: 'spis przepisów | archiwum kulinarne',
    url: '/przepisy',
    // images: [
    //   {
    //     url: '/images/opengraph-img-1200-630.jpg',
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },
  appleWebApp: {
    title: 'spis | archiwum kulinarne',
  },
};

const Page = async () => <Recipes />;

export default Page;
