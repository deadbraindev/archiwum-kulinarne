import Link from 'next/link';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerLinks">
        <ul>
          <li>
            <Link href="/kontakt" className="footerLink" scroll>
              kontakt
            </Link>
          </li>
          <li>
            <Link href="/wpa" className="footerLink">
              aplikacja
            </Link>
          </li>

          <li>
            <Link href="/losowy" className="footerLink">
              losowy traf
            </Link>
          </li>

          <li>
            <Link href="/nieznaleziono" className="footerLink">
              404test
            </Link>
          </li>
        </ul>

        <div className="footerInfo">
          <p>
            archiwum kulinarne to projekt digitalizacji rodzinnych przepisów
            kulinarnych, bo baza danych w chmurze jest trwalsza niż papier
          </p>
        </div>
      </div>

      <div className="footerCopyright">
        <span>
          <a
            className="footerHomeLink"
            href="https://archiwumkulinarne.deadbrain.dev"
          >
            archiwum kulinarne
          </a>
        </span>
        <span>made in poland mmxxi-mmxxiv</span>
        <span>
          by{' '}
          <a
            className="footerSocialLink"
            href="https://www.github.com/deadbraindev"
          >
            @deadbrain
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
