import Link from 'next/link';

export const metadata = {
  title: 'nieznaleziono | archiwum kulinarne',
  openGraph: {
    title: 'nieznaleziono',
    url: '/nieznaleziono',
    images: [
      {
        url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
