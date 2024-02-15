'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useFavoriteContext } from '../context/useFavoriteContext';
import {
  categoryHeaderColorPicker,
  categorySvgPicker,
  isFavorite as checkFavorite,
} from './RecipeUtilities';
import ReviewStars from './ReviewStars';

export default function RecipeCardSmall(props) {
  const { slug, name, model, category, star } = props;
  const { addToFavorite, removeFromFavorite, state } = useFavoriteContext();

  const [isFavorite, setIsFavorite] = useState(checkFavorite(slug)); // sprawdzenie czy przepis jest favorite

  const RCSfavoriteClasses = classNames('RCSfavorite', {
    active: isFavorite,
  });

  useEffect(() => {
    setIsFavorite(checkFavorite(slug));
  }, [state, slug]);

  const handleFavoriteButton = () => {
    if (isFavorite) {
      toast('usunięto z ulubionych!');
      removeFromFavorite({ name, slug, category });
      setIsFavorite(false);
    } else if (!isFavorite) {
      toast('dodano do ulubionych!');
      addToFavorite({ name, slug, category });
      setIsFavorite(true);
    }
  };

  return (
    <div className="RCS">
      {model ? (
        <>
          <div className={`RCSimg ${categoryHeaderColorPicker(category)}`}>
            {categorySvgPicker(category)}
          </div>
          <h2 className="RCSname">{name}</h2>
        </>
      ) : (
        <Link href={`/przepisy/${slug}`} className="RCSlink">
          <div className={`RCSimg ${categoryHeaderColorPicker(category)}`}>
            <div className="svgBackground">{categorySvgPicker(category)}</div>
          </div>
          <h2 className="RCSname">{name}</h2>
        </Link>
      )}

      <div className="RCSinfo">
        <div
          role="button"
          tabIndex={0}
          className={RCSfavoriteClasses}
          onClick={() => {
            handleFavoriteButton();
          }}
          aria-hidden="true"
          onKeyPress={() => {
            handleFavoriteButton();
          }}
        >
          <svg className="RCSfavoriteHeart" viewBox="-1 -1 18 18">
            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </div>

        <div
          role="button"
          tabIndex={-1}
          className="RCSfavorite RCSfavoriteAnimate"
          onClick={() => {
            handleFavoriteButton();
          }}
          aria-hidden="true"
        >
          <svg viewBox="-1 -1 18 18">
            <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </div>

        <div className="RCSdesc">
          <div className="RCStime">
            <svg
              width="12"
              height="12"
              fill="currentColor"
              className="RCStime"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
            <p>0h00m</p>
          </div>
          <ReviewStars star={star} slug={slug} />
        </div>
      </div>
    </div>
  );
}
