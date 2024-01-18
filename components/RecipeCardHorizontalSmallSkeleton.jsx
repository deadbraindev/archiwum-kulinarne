import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecipeCardSmallHorizontalSkeleton() {
  return (
    <div className="RCSH">
      <div className="RCSHlink">
        <div className="RCSHimg skeleton" />

        <div className="RCSHinfo">
          <h2 className="RCSHname">
            <Skeleton
              count={1}
              width="40%"
              height="1.2rem"
              enableAnimation={false}
            />
          </h2>

          <div className="RCSHdesc">
            <div className="RCStime">
              <Skeleton
                count={1}
                width="4em"
                height="0.7em"
                enableAnimation={false}
              />
            </div>
            <div className="RCSrating">
              <Skeleton
                count={1}
                width="4em"
                height="0.7em"
                enableAnimation={false}
              />
            </div>{' '}
          </div>
        </div>
      </div>
      <div className="RCSfavorite">
        <Skeleton
          count={1}
          width="1.4em"
          height="1.4em"
          borderRadius="1rem"
          enableAnimation={false}
        />
      </div>
    </div>
  );
}
