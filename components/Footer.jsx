'use client';

import Link from 'next/link';
// import Skeleton from 'react-loading-skeleton';
// import useLocalStorage from 'use-local-storage';
// import { useAuthContext } from '../Hooks/useAuthContext.js';
// import { useState, useEffect } from 'react';

function Footer() {
  // const { isLoggedIn, isFetching } = useAuthContext();

  //* THEME CHANGER
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // const [theme, setTheme] = useState(`theme ${defaultDark} ? 'dark' : 'light'`);

  // useEffect(() => {
  //   const prefersDark = window.matchMedia(
  //     '(prefers-color-scheme: dark)'
  //   ).matches;

  //   if (prefersDark) {
  //     setTheme('dark');
  //   }
  // }, [defaultDark]);
  // const switchTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  // };
  // document.querySelector('body').setAttribute('data-theme', `${theme}`);
  // const preferColorSchema = window.matchMedia('(prefers-color-scheme: dark)');
  // console.log(preferColorSchema);
  //* THEME CHANGER END

  return (
    <footer className="footer">
      <div className="footerSocial" />

      <div className="footerLinks">
        <ul>
          <li>
            <Link href="/kontakt" className="footerLink">
              kontakt
            </Link>
          </li>
          <li>
            <Link href="/wpa" className="footerLink">
              aplikacja mobilna
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

          {/* {isFetching ? (
            <li>
              <Skeleton
                count={1}
                width="100px"
                height="1em"
                enableAnimation={false}
              />
            </li>
          ) : isLoggedIn ? (
            <li>
              <Link to="admin" className="footerLink">
                konto
              </Link>
            </li>
          ) : (
            <li>
              <Link to="login" className="footerLink">
                zaloguj
              </Link>
            </li>
          )} */}
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
        <span>made in poland mmxxi-mmxxiii</span>
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
