import Link from 'next/link';

export const metadata = {
  title: 'ulubione | archiwum kulinarne',
  openGraph: {
    title: 'ulubione | archiwum kulinarne',
    url: '/ulubione',
    images: [
      {
        url: 'https://archiwumkulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <div className="recipesContainer favoritesContainer">
      <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink" href="/przepisy">
          przepisy
        </Link>
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink active" href="/ulubione">
          ulubione
        </Link>
      </p>
      {children}
    </div>
  );
}
