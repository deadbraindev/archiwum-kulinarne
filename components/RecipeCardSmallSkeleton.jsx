import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecipeCardSmallSkeleton() {
  return (
    <div className="RCS">
      <div className="RCSimg skeleton" />
      <h1 className="RCSname">
        <Skeleton
          count={1}
          width="90%"
          height="1.2rem"
          // baseColor="#bababa"
          // highlightColor="#dadada"
          enableAnimation={false}
        />
      </h1>

      <div className="RCSinfo">
        <div className="RCSfavorite">
          <Skeleton
            count={1}
            width="1.4em"
            height="1.4em"
            // baseColor="#bababa"
            borderRadius="1rem"
            enableAnimation={false}
          />
        </div>
        <div className="RCSdesc">
          <div className="RCStime">
            <Skeleton
              count={1}
              width="4em"
              height="0.7em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
          </div>
          <div className="RCSrating">
            <Skeleton
              count={1}
              width="4em"
              height="0.7em"
              // baseColor="#bababa"
              enableAnimation={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
