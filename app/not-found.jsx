import Link from 'next/link';

export const metadata = {
  title: 'nieznaleziono | archiwum kulinarne',
  openGraph: {
    title: 'nieznaleziono',
    url: '/nieznaleziono',
    images: [
      {
        url: 'https://archiwumkulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className="notFoundContainer">
      <h1 className="notFoundTitle">
        nie znaleziono wybranej przez ciebie strony
      </h1>
      <div className="notFoundButtons">
        <Link className="notFoundButton" href="/">
          wróć na stronę główną
        </Link>
        {/* <span>lub</span> */}
        <Link className="notFoundButton primary" href="/">
          przejdź do losowego przepisu
        </Link>
      </div>
    </div>
  );
}
