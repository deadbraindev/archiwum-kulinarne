import Recipes from './Recipes';

export const metadata = {
  title: 'spis przepisów',
  openGraph: {
    title: 'spis przepisów | archiwum kulinarne',
    url: '/przepisy',
  },
  appleWebApp: {
    title: 'spis | archiwum kulinarne',
  },
};

const Page = async () => <Recipes />;

export default Page;
