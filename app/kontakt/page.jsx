/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';

export const metadata = {
  title: 'kontakt | archiwum kulinarne',
  openGraph: {
    title: 'kontakt | archiwum kulinarne',
    url: '/kontakt',
    images: [
      {
        url: 'https://archiwumkulinarne.deadbrain.dev/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="recipesContainer">
      <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink active" href="/kontakt">
          kontakt
        </Link>
      </p>
      <section className="contactContainer">
        <form className="contactForm">
          <label className="contactLabel" htmlFor="name">
            imię
          </label>
          <input
            className="contactInput"
            type="text"
            id="name"
            autoComplete="off"
          />

          <label className="contactLabel" htmlFor="email">
            email
          </label>
          <input
            className="contactInput"
            type="text"
            id="email"
            autoComplete="off"
          />

          <label className="contactLabel" htmlFor="contactText">
            wiadomość
          </label>
          <textarea
            className="contactInputBig"
            type="text"
            id="contactText"
            autoComplete="off"
          />

          <button className="contactSubmit" type="submit" disabled>
            wyślij
          </button>
        </form>
      </section>
    </div>
  );
}
