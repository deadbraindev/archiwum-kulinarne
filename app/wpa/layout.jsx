import Link from 'next/link';

export const metadata = {
  title: 'aplikacja | archiwum kulinarne',
  openGraph: {
    title: 'wpa | archiwum kulinarne',
    url: '/wpa',
    images: [
      {
        url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <div className="recipesContainer">
      <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink active" href="/wpa">
          aplikacja
        </Link>
      </p>
      {children}
    </div>
  );
}
