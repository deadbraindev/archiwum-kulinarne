/* eslint-disable jsx-a11y/label-has-associated-control */

export const metadata = {
  title: 'kontakt | archiwum kulinarne',
  openGraph: {
    title: 'kontakt',
    url: '/kontakt',
    images: [
      {
        url: 'https://archiwumkulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      {/* <p className="RCcategory">
        <span className="RCcategorySeparator">{'>'}</span>
        <Link className="RCcategoryLink active" href="/kontakt">
          kontakt
        </Link>
      </p> */}

      <section className="contactContainer">
        {/* <p className="contactInfo">
        podziel się swoją opinią, zgłoś błąd albo wykaż chęć dodania swoich
        przepisów na stronę
      </p> */}
        <div className="dot" />
        <h2 className="contactTitle">odbiorca</h2>
        <form className="contactForm">
          <label className="contactLabel" htmlFor="">
            imię
          </label>
          <input
            className="contactInput"
            type="text"
            defaultValue="ddbnr"
            disabled
          />
          <label className="contactLabel" htmlFor="">
            email
          </label>
          <input
            className="contactInput"
            type="text"
            defaultValue="deadbrain@deadbrain.dev"
            disabled
          />
        </form>

        <h2 className="contactTitle">nadawca</h2>
        <form className="contactForm">
          <label className="contactLabel" htmlFor="name">
            imię
          </label>
          <input className="contactInput" type="text" id="name" />

          <label className="contactLabel" htmlFor="email">
            email
          </label>
          <input className="contactInput" type="text" id="email" />

          <label className="contactLabel" htmlFor="">
            wiadomość
          </label>
          <textarea className="contactInputBig" type="text" />

          <button className="contactSubmit" type="submit">
            wyślij
          </button>
        </form>
      </section>
    </>
  );
}
