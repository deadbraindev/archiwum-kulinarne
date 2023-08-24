// import TopBarProgress from 'react-topbar-progress-indicator';
import RecipeCardSkeleton from '../../../components/RecipeCardSkeleton';

export default function Loading() {
  // TopBarProgress.config({
  //   barColors: {
  //     0: '#ffce06',
  //   },
  //   barThickness: 8,
  //   shadowBlur: 0,
  // });

  return (
    <>
      {/* <TopBarProgress /> */}
      <RecipeCardSkeleton />
    </>
  );
}
