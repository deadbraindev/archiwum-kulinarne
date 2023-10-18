'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { ToastContainer, Slide } from 'react-toastify';
// import useMobileDetect from '../lib/useMobileDetect';
import 'react-toastify/dist/ReactToastify.css';
import {
  paramSearchValidator,
  paramCategoryValidator,
} from './RecipeUtilities';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(undefined);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowWidth;
}
function Navbar() {
  // const currentDevice = useMobileDetect();
  const searchParams = useSearchParams();

  const paramSearch = searchParams.get('szukaj'); // zaciaganie paramatre search z linka
  const paramCategory = paramCategoryValidator(searchParams.get('kategoria'))
    ? searchParams.get('kategoria')
    : null;

  const [inputSearch, setInputSearch] = useState('');

  const inputRefFocus = useRef(null); // referencja zeby odwolac sie do inputu i zabrac mu focus
  const router = useRouter();

  const searchButton = (input) => {
    if (!paramSearchValidator(input)) {
      router.push('');
      setInputSearch('');
    } else if (
      paramSearchValidator(input) &&
      paramCategoryValidator(paramCategory)
    ) {
      router.push(`/przepisy?kategoria=${paramCategory}&szukaj=${input}`);
    } else {
      router.push(`/przepisy?szukaj=${input}`);
    }
  };
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const onSubmitInputSearch = (event) => {
    event.preventDefault(); // brak odswiezania strony przy submicie
    setIsHamburgerClicked(false);
    document.body.classList.remove('noScroll');
    searchButton(inputSearch);
    inputRefFocus.current.blur(); // zabranie focus inputowi searchbara
  };

  useEffect(() => {
    if (paramSearch === null) setInputSearch('');
    else setInputSearch(paramSearch);
  }, [paramSearch]); // use effect do dynamicznego odsiwezania tego co jest w inputach po zmianie path

  const windowWidth = useWindowWidth();

  // !!debug
  // const [color, setColor] = useState('');

  // const techinfo = () => {
  //   if (currentDevice.isMobile()) setColor(`mobile, width:${windowWidth}px`);
  //   else if (currentDevice.isDesktop())
  //     setColor(`desktop, width:${windowWidth}px`);
  // };

  // useEffect(() => {
  //   techinfo();
  // }, [windowWidth]);
  // !!debug

  const navHamburgerDynamicClasses = classNames(
    'navHamburger',
    windowWidth === undefined ? 'hamLoading visible' : '', // warunek bo przy odsiwezaniu jest moment ze windowWidth jest undefined i brzydko znika navbar
    windowWidth !== undefined && windowWidth < 900 ? 'visible' : 'hidden',
    { active: isHamburgerClicked }
  );
  const navListDynamicClasses = classNames(
    'navList',
    windowWidth === undefined ? 'navLoading' : '', // warunek bo przy odsiwezaniu jest moment ze windowWidth jest undefined i brzydko znika navbar
    windowWidth < 900 && !isHamburgerClicked ? 'hidden' : 'visible'
  );

  useEffect(() => {
    setIsHamburgerClicked(false);
    document.body.classList.remove('noScroll');
  }, [windowWidth]);

  const handleHamburger = () => {
    if (isHamburgerClicked) {
      setIsHamburgerClicked(false);
      document.body.classList.remove('noScroll');
    } else {
      setIsHamburgerClicked(true);
      document.body.classList.add('noScroll');
    }
  };

  const handleNavLink = () => {
    setIsHamburgerClicked(false);
    document.body.classList.remove('noScroll');
  };
  const clearSearch = () => {
    setIsHamburgerClicked(false);
    document.body.classList.remove('noScroll');

    setInputSearch('');
    searchButton('');
  };

  const pathname = usePathname();

  return (
    <>
      <ToastContainer
        position="bottom-left"
        // position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
        transition={Slide}
      />

      <header className="navBar">
        <nav>
          <div className="navMini">
            <Link
              // className="navLogo"
              href="/"
              className={pathname === '/' ? 'navLogo active' : 'navLogo'}
            >
              archiwum kulinarne
            </Link>

            <button
              className={navHamburgerDynamicClasses}
              onClick={handleHamburger}
              type="button"
            >
              <span className="hamburgerLine" />
              <span className="hamburgerLine" />
            </button>
          </div>

          <ul className={navListDynamicClasses}>
            <li>
              <Link
                href="/"
                onClick={handleNavLink}
                className={pathname === '/' ? 'navLink active' : 'navLink'}
              >
                strona główna
              </Link>
            </li>
            <li>
              <Link
                href="/przepisy"
                onClick={handleNavLink}
                className={
                  pathname === '/przepisy' ? 'navLink active' : 'navLink'
                }
              >
                spis
              </Link>
            </li>
            <li>
              <Link
                href="/ulubione"
                onClick={handleNavLink}
                className={
                  pathname === '/ulubione' ? 'navLink active' : 'navLink'
                }
              >
                ulubione
              </Link>
            </li>
            <li className="navSearch">
              <form onSubmit={onSubmitInputSearch}>
                <input
                  type="text"
                  className="searchInput"
                  name="search"
                  placeholder="szukaj"
                  autoComplete="off"
                  value={inputSearch}
                  onChange={(event) => setInputSearch(event.target.value)}
                  ref={inputRefFocus}
                />
                {inputSearch ? (
                  <button
                    type="button"
                    className="searchInputClear"
                    onClick={clearSearch}
                  >
                    <svg
                      viewBox="0 0 16.81 16.81"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m16.81 15.32-6.92-6.92 6.92-6.91-1.49-1.49-6.92 6.91-6.91-6.91-1.49 1.49 6.91 6.91-6.91 6.92 1.49 1.49 6.91-6.92 6.92 6.92z" />
                    </svg>
                  </button>
                ) : null}
                <button
                  className="searchButton"
                  type="submit"
                  onClick={(event) => event.currentTarget.blur()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17.49 17.49"
                  >
                    <path d="M11.79,10.31A6.43,6.43,0,0,0,13,6.5,6.75,6.75,0,0,0,6.5,0a6.5,6.5,0,0,0,0,13,7.64,7.64,0,0,0,1.69-.22,6.71,6.71,0,0,0,2.11-1c.23.24,5.7,5.7,5.7,5.7L17.49,16ZM6.5,11A4.5,4.5,0,1,1,11,6.5,4.49,4.49,0,0,1,6.5,11Z" />
                  </svg>
                </button>
              </form>
            </li>

            {/* {user && (
            <>
              <span className='navLink' style={{position: "absolute", margin: "0" }}>{user.email}</span>
              <button className='searchButton' onClick={logoutButton} style={{position: "absolute", margin: "0" }}>logout</button>
            </>
          )} */}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
