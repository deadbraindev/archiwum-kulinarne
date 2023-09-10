'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import getRecipe from '../../lib/getRecipe';

// export const metadata = {
//   title: 'losowy | archiwum kulinarne',
//   openGraph: {
//     title: 'losowy',
//     url: '/losowy',
//     images: [
//       {
//         url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

function Losowy() {
  // const router = useRouter();

  useEffect(() => {
    // Funkcja do pobrania losowego przepisu z API
    const fetchRandomRecipe = async () => {
      try {
        const response = await getRecipe('random'); // Zapytanie do /api/recipes/random
        console.log(
          '🚀 ~ file: page.jsx:30 ~ fetchRandomRecipe ~ response:',
          response
        );
        if (response.ok) {
          const recipe = await response.json();

          // Przekierowanie na stronę przepisu, na przykład /przepis/[id]
          redirect(`/przepis/${recipe.slug.slugCurrent}`);
        } else {
          console.error('Błąd podczas pobierania losowego przepisu');
        }
      } catch (error) {
        console.error('Błąd podczas pobierania losowego przepisu:', error);
      }
    };

    fetchRandomRecipe();
  }, []);

  return (
    <div>
      <p>Pobieram losowy przepis...</p>
      {/* Możesz dodać tu jakieś komponenty do wyświetlenia informacji o ładowaniu */}
    </div>
  );
}

export default Losowy;
