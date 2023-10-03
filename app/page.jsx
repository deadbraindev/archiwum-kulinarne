'use client';

import { useEffect, useState } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useFavoriteContext } from '../context/useFavoriteContext';
import SwiperContainer from '../components/SwiperContainer';

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
        <div className="heroPattern">
          {/* <div className="dot" /> */}
          <h1 className="heroTextContainer">
            <span className="heroText">zdigitalizowane</span>
            <span className="heroText">rodzinne</span>
            <span className="heroText">przepisy</span>
            <span className="heroText">kulinarne</span>
            <span className="heroText">***</span>
            <span className="heroText">landing page</span>
            <span className="heroText">work in progress</span>
          </h1>
        </div>
      </div>

      {isLoading ? (
        <SwiperContainer cards="skeleton" title="ostatnio dodane" />
      ) : (
        <SwiperContainer
          cards={recentlyAdded}
          title="ostatnio dodane"
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
