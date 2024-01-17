// 'use client';

// import { useEffect, useState } from 'react';
// import TopBarProgress from 'react-topbar-progress-indicator';
import Link from 'next/link';
// import { useFavoriteContext } from '../context/useFavoriteContext';
// import SwiperContainer from '../components/SwiperContainer';
import RecipesGrid from '../components/RecipesGrid';
// import WPATabs from '../components/WPATabs';

export default function Page() {
  // TopBarProgress.config({
  //   barColors: {
  //     0: '#ffce06',
  //   },
  //   barThickness: 8,
  //   shadowBlur: 0,
  // });

  // const { isFetching, state } = useFavoriteContext();

  // const [favoriteCards, setFavoriteCards] = useState([]);

  // const [data, setData] = useState('skeleton');
  // console.log('🚀 ~ Page ~ data:', data);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch('/api/recipes?sort=no&pagesize=12')
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // setLoading(false);
  //       return res.status;
  //     })
  //     .then((res) => {
  //       setData(res);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   setFavoriteCards(state);
  // }, [state]);

  // const recentlyAdded = data?.results
  //   ? data.results?.tiles.map((tile) => tile.value)
  //   : [];
  return (
    <>
      {/* {isLoading && <TopBarProgress />} */}

      <div className="hero">
        <h1 className="heroTitle">
          zdigitalizowane rodzinne przepisy kulinarne
        </h1>
        <span className="heroText">
          stwórz swoje własne archiwum kulinarne - miejsce, gdzie smaki,
          historie i pasja stają się nieśmiertelne
        </span>
        <div className="heroButtons">
          <div className="heroButton secondary">
            {/* <span className="tooltip-text">wkrótce dostępne!</span> */}
            dodaj przepis
          </div>
          <Link className="heroButton primary" href="/przepisy">
            zobacz przepisy
          </Link>
        </div>
      </div>

      {/* <section className="features">
        <h2>co nowego</h2>
      </section> */}
      {/* <div className="sectionSeparator">•••</div> */}

      <RecipesGrid size="8" sort="no" title="ostatnio dodane" />

      {/* {isLoading ? (
        <SwiperContainer cards="skeleton" title="ostatnio dodane" />
      ) : (
        <SwiperContainer
          cards={recentlyAdded}
          title="najnowsze przepisy"
          loop={false}
          category="salatki"
        />
      )}
      {isFetching ? (
        <SwiperContainer cards="skeleton" title="twoje ulubione" />
      ) : (
        <SwiperContainer
          cards={favoriteCards}
          title="twoje ulubione"
          loop={false}
          category="slodkie"
        />
      )} */}
      {/* <div className="sectionSeparator">•••</div>
      <section className="article">
        <h2 className="articleTitle">twórz swoje własne zbiory przepisów</h2>
        <div className="articleBody">
          zbuduj spersonalizowaną kolekcję smaków dzięki funkcji tworzenia
          własnych zbiorów przepisów. Udostępniaj swoje przepiśniki z innymi,
          wspólnie rozwijając naszą społeczność, albo zachowuj swoje kulinarne
          tajniki, trzymając swoje zbiory jako prywatne
        </div>
      </section>

      <div className="sectionSeparator">•••</div>

      <section className="article">
        <h2 className="articleTitle">zachowuj ciekawe przepisy na później</h2>
        <div className="articleBody">
          Dodaj swoje ulubione przepisy do sekcji ulubionych jednym kliknięciem
          serduszka i nie martw się, że je zgubisz. Prosto, wygodnie i zawsze
          pod ręką!
        </div>
      </section>
      <div className="sectionSeparator">•••</div> */}

      {/* {data === 404 ? <span>błąd 404</span> : null} */}
    </>
  );
}
