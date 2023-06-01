import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <div className="footer">
        <h1>Not found – 404ddd!</h1>
        <div>
          <Link href="/">Go back to Home</Link>
        </div>
      </div>
    </>
  );
}
