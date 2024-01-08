'use client';

import { useEffect, useState } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import Link from 'next/link';
import { useFavoriteContext } from '../context/useFavoriteContext';
import SwiperContainer from '../components/SwiperContainer';
import RecipesGrid from '../components/RecipesGrid';

export default function Page() {
  TopBarProgress.config({
    barColors: {
      0: '#ffce06',
    },
    barThickness: 8,
    shadowBlur: 0,
  });

  const { isFetching, state } = useFavoriteContext();

  const [favoriteCards, setFavoriteCards] = useState([]);

  const [data, setData] = useState('skeleton');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('/api/recipes?sort=no&pagesize=12')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        setLoading(false);
        return res.status;
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFavoriteCards(state);
  }, [state]);

  const recentlyAdded = data?.results
    ? data.results?.tiles.map((tile) => tile.value)
    : [];

  return (
    <>
      {isLoading && <TopBarProgress />}

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
      <RecipesGrid size="8" sort="no" title="ostatnio dodane" />

      {isLoading ? (
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
      )}
      {data === 404 ? <span>błąd 404</span> : null}
    </>
  );
}
