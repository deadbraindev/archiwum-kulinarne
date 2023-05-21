// import TopBarProgress from 'react-topbar-progress-indicator';
import { Suspense } from 'react';
// import RecipeCardSkeleton from '../../../components/RecipeCardSkeleton';
// import getRecipe from '../../../lib/getRecipe';
// import Loading from './loading';
import RecipeCard from '../../../components/RecipeCard';

async function getMetadata(slug) {
  const res = await fetch(
    `https://archiwum-kulinarne.vercel.app/api/recipes/${slug}`
  );
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const recipeData = await getMetadata(slug);
  const recipe = await recipeData;

  // console.log(recipe);
  if (recipe.success) {
    return {
      title: recipe.name?.toLowerCase(),
      openGraph: {
        title: `${recipe.name?.toLowerCase()} | archiwum kulinarne`,
        url: `https://archiwumkulinarne.deadbrain.dev/przepisy/${recipe.slug?.slugCurrent}`,
        images: [
          {
            url: 'https://lh3.googleusercontent.com/fife/APg5EOYBTTSJX-_lcjSVYjREyPCTH7--vis8oeVGXSDG3gO_jNEVc9xHFXT3ECinncmG8jt8KBo6C0U4M8Up7FFsjN9Wvu7sY5A6GzdYiUyCw0eMf1eF-Y1Wnar-jcyuSamr36wRzRoKaIgwrKU6dxr46XN8IPaIw5BGw0lQQBiImvgpKQUDF4me4hmqa6UeO6otH8gIptXszi8mF_YaoAmYA2swRttSeBoS31KHPMzPsPvOtw8XH9rdfb7xBLEDxUpsfdjAuySkc4qfGG-A6nwihrB8LrzT60yDndtbNxcIJh1WJxTmPbuqZoPT8R0wzbxCYe59L58TlqDSFz8zTURa1fFClfcVWvmLUBnTCj6me0SqrB-3zzBCe94Zn9EEXW1OCG6M1VdD0lOCqxXwTNYFCbm6KYkS5NndTlkRegjv21fy4UTWtkBi0yX2a4AO8NiDTYwlqF1wZ9ESSP30S4zs_Y97IujemTyi1jQtY_-bjE26Z9x3tn41oQ5omXftxYFX04lvYJU47BYK4xbNjvdp3qq2kF-SN0T8eIy7Y_BAnvVU6bGl3XVtcThlTsOh5lGFuGqicmA6eHp0UGg9fEFdBmhRcNnSZuS3hS2ocqjVkN52zTP5nDwPGsH0avjycOYkOmKPRUL6Lqc3XS-hQ-dpK3CSz6_aqidegHlpEuUjkkHE4rt5jsV7u7TenODkMjdTJXgQXjOwek6EbxumWtUmRdH2fVU--G-BIQOpIYJLDLZmJd94vTFT0fx7LEhat-Ot_m-XBCoH-AHq3fvjjy5gwkdq41v2wL6mDpxlEiizqRJxl4_Cl1kfkQc-VjZS0U59wiUmgJnyQgr3wIqxn1JjTkAbYxUkbHY4wd4okxXR0SiOuV2ZdZ6G-1AS7mh1vlxMkYxysW-WRm4MuqW09bz6yNf6MKOCVIxRyu3SDcuIpYqnAC8_mciTOJ1GzQIgQc1oh00wjWDQ1ogtBJ03f-3WkL6k9p4WNpNYisucXqTacaqp9v-mwPF7fysSHPmIyDeW9E8jMAyWO1UFTm_wlYEWCRMVDB-Gl_CF4WDjvxIH-Q_sExGevue5EwvZnk_aqgK17ma2G-PwqYo8c9NikrB2D-CYC_ZXMaqHI6zbCtt4qCJv3NACMfHwyOxjVU2C0oTOHfYJMFyH9qoYIBnwsn0m93o_do1RxXmGa1iwZRoIZD-1STRvWja-3kB_F1CuvMvtQpK4jHTDkFmRB9N3Iv705urrcn83TCVFeDi9W25cL6PCR_oNp1UUOKHTkqDf-5D2bUQeyojc4Xi7Y13kW3S4cIVTu48uDmzBsgiE0CU2UniW1Xs3usVIYFLFxc_K4iEBDg30tmzTgTDOrOf_Frca4ETy8-ne5YbSARvjFTBbLMlDQ8fnvm29FQtWzcs6_2otw0fKVci_nyrx6LtpCycgV8_dRjS1vYhPT081EY1pQACU-ionwQoChe43j1f6bnxFCjg_gXB33Ia_gWRLGsCY-A9Ot_IaWf5qkURrnI2zTf8M-n9LjHVpfaVbYJHMLg=w4850-h2400',
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
  return {
    title: 'błędna nazwa przepisu',
    openGraph: {
      title: 'błędna nazwa przepisu | archiwum kulinarne',
      url: `https://archiwumkulinarne.deadbrain.dev/przepisy`,
      images: [
        {
          url: 'https://lh3.googleusercontent.com/fife/APg5EOYBTTSJX-_lcjSVYjREyPCTH7--vis8oeVGXSDG3gO_jNEVc9xHFXT3ECinncmG8jt8KBo6C0U4M8Up7FFsjN9Wvu7sY5A6GzdYiUyCw0eMf1eF-Y1Wnar-jcyuSamr36wRzRoKaIgwrKU6dxr46XN8IPaIw5BGw0lQQBiImvgpKQUDF4me4hmqa6UeO6otH8gIptXszi8mF_YaoAmYA2swRttSeBoS31KHPMzPsPvOtw8XH9rdfb7xBLEDxUpsfdjAuySkc4qfGG-A6nwihrB8LrzT60yDndtbNxcIJh1WJxTmPbuqZoPT8R0wzbxCYe59L58TlqDSFz8zTURa1fFClfcVWvmLUBnTCj6me0SqrB-3zzBCe94Zn9EEXW1OCG6M1VdD0lOCqxXwTNYFCbm6KYkS5NndTlkRegjv21fy4UTWtkBi0yX2a4AO8NiDTYwlqF1wZ9ESSP30S4zs_Y97IujemTyi1jQtY_-bjE26Z9x3tn41oQ5omXftxYFX04lvYJU47BYK4xbNjvdp3qq2kF-SN0T8eIy7Y_BAnvVU6bGl3XVtcThlTsOh5lGFuGqicmA6eHp0UGg9fEFdBmhRcNnSZuS3hS2ocqjVkN52zTP5nDwPGsH0avjycOYkOmKPRUL6Lqc3XS-hQ-dpK3CSz6_aqidegHlpEuUjkkHE4rt5jsV7u7TenODkMjdTJXgQXjOwek6EbxumWtUmRdH2fVU--G-BIQOpIYJLDLZmJd94vTFT0fx7LEhat-Ot_m-XBCoH-AHq3fvjjy5gwkdq41v2wL6mDpxlEiizqRJxl4_Cl1kfkQc-VjZS0U59wiUmgJnyQgr3wIqxn1JjTkAbYxUkbHY4wd4okxXR0SiOuV2ZdZ6G-1AS7mh1vlxMkYxysW-WRm4MuqW09bz6yNf6MKOCVIxRyu3SDcuIpYqnAC8_mciTOJ1GzQIgQc1oh00wjWDQ1ogtBJ03f-3WkL6k9p4WNpNYisucXqTacaqp9v-mwPF7fysSHPmIyDeW9E8jMAyWO1UFTm_wlYEWCRMVDB-Gl_CF4WDjvxIH-Q_sExGevue5EwvZnk_aqgK17ma2G-PwqYo8c9NikrB2D-CYC_ZXMaqHI6zbCtt4qCJv3NACMfHwyOxjVU2C0oTOHfYJMFyH9qoYIBnwsn0m93o_do1RxXmGa1iwZRoIZD-1STRvWja-3kB_F1CuvMvtQpK4jHTDkFmRB9N3Iv705urrcn83TCVFeDi9W25cL6PCR_oNp1UUOKHTkqDf-5D2bUQeyojc4Xi7Y13kW3S4cIVTu48uDmzBsgiE0CU2UniW1Xs3usVIYFLFxc_K4iEBDg30tmzTgTDOrOf_Frca4ETy8-ne5YbSARvjFTBbLMlDQ8fnvm29FQtWzcs6_2otw0fKVci_nyrx6LtpCycgV8_dRjS1vYhPT081EY1pQACU-ionwQoChe43j1f6bnxFCjg_gXB33Ia_gWRLGsCY-A9Ot_IaWf5qkURrnI2zTf8M-n9LjHVpfaVbYJHMLg=w4850-h2400',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  // const recipeData = await getRecipe(slug);

  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      <RecipeCard slug={slug} />
      {/* </Suspense> */}
      {/* <div>{data}</div> */}
    </>
  );
}
