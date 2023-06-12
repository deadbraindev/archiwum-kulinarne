'use client';

import TopBarProgress from 'react-topbar-progress-indicator';

export default function Loading() {
  TopBarProgress.config({
    barColors: {
      0: '#ffce06',
    },
    barThickness: 8,
    shadowBlur: 0,
  });

  return (
    <>
      <TopBarProgress />
      {/* <p>loading</p> */}
    </>
  );
}
