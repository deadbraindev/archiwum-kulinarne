// import Swipe, { SwipeItem } from 'swipejs/react';
// import RecipeCardSmallSkeleton from '../components/RecipeCardSmallSkeleton';
// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import SwiperCore, { Pagination } from 'swiper/core';
// import "/Users/deadbrain/Documents/code/node-js/arch-kul-mern-2/client/node_modules/swiper/swiper.min.css";
// import 'swiper/css/navigation';
// import RecipeCardSmall from '../components/RecipeCardSmall';
// import { isFavorite } from '../components/RecipeUtilities';
// import Flickity from 'react-flickity-component';
// import Slider from '../components/Carousel';
// import SliderFlex from '../components/SliderFlex';
import SwiperContainer from '../components/SwiperContainer';
// import { isFavorite } from '../components/RecipeUtilities';
// import { Swiper } from 'swiper/react';

// import RecipeCardSmallSkeleton from '../components/RecipeCardSmallSkeleton';

export const metadata = {
  title: 'strona główna | archiwum kulinarne',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  openGraph: {
    title: 'strona główna',
    url: '/',
    images: [
      {
        url: 'https://archiwum-kulinarne.vercel.app/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  const obj = [
    {
      name: 'Karpatka',
      slug: 'karpatka',
      category: 'ciasta',
      model: false,
    },
    {
      name: 'Lody',
      slug: 'lody',
      category: 'lody',
      model: false,
    },
    {
      name: 'Wafle',
      slug: 'wafle',
      category: 'slodkie',
      model: false,
    },
  ];
  return (
    <>
      <div className="hero">
        <div className="heroPattern">
          <h1 className="heroTextContainer">
            <span className="heroText">zdigitalizowane</span>
            <span className="heroText">rodzinne</span>
            <span className="heroText">przepisy</span>
            <span className="heroText">kulinarne</span>
          </h1>
        </div>
      </div>

      {/* <div className='heroBackground'>
            <RecipeCardSmall
              name={"Kartpatka"}
              slug={""}
              key={0}
              category={"ciasta"}
              model={true}
            />
            <RecipeCardSmall
              name={"Wafle"}
              slug={""}
              key={1}
              category={"slodkie"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Syrop z mlecza"}
              slug={""}
              key={2}
              category={"soki"}
              model={true}
            />
            <RecipeCardSmall
              name={"Lody"}
              slug={""}
              key={3}
              category={"lody"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Hamburger"}
              slug={""}
              key={4}
              category={"fastfood"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Martini"}
              slug={""}
              key={5}
              category={"drinki"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Makowiec"}
              slug={""}
              key={6}
              category={"ciasta"}
              model={true}
            />
            <RecipeCardSmall
              name={"Ryba opiekana w zalewie"}
              slug={""}
              key={7}
              category={"ryby"}
              model={true}
            />
            <RecipeCardSmall
              name={"Ogórki z curry"}
              slug={""}
              key={8}
              category={"przetwory"}
              model={true}
            />
            <RecipeCardSmall
              name={"Kotleto-gołąbki"}
              slug={""}
              key={9}
              category={"obiadowe"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Kartpatka"}
              slug={""}
              key={0}
              category={"ciasta"}
              model={true}
            />
            <RecipeCardSmall
              name={"Wafle"}
              slug={""}
              key={1}
              category={"slodkie"}
              model={true}
              favorite={true}
            />
            <RecipeCardSmall
              name={"Syrop z mlecza"}
              slug={""}
              key={2}
              category={"soki"}
              model={true}
            />
            <RecipeCardSmall
              name={"Lody"}
              slug={""}
              key={3}
              category={"lody"}
              model={true}
            />
          </div> */}

      {/* <section className='howItWorks'>
        <h1 className='swiperName'>{"jak to działa"}</h1>
        <div className='HIWCardContainer'>
          <div className='HIWCard'>
            {"[TODO]zeskanuj"}
          </div>
          <div className='HIWCard'>
            {"[TODO]zapisz"}
          </div>
          <div className='HIWCard'>
            {"[TODO]wyślij"}
          </div>
        </div>
      </section>
      
      <section className='info'>
        <h1 className='swiperName'>Lorem ipsum</h1>

          <p className="lorem">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eum aliquid obcaecati iste iure, autem libero delectus, ipsam commodi aspernatur nostrum nobis repellendus sunt nam temporibus et natus dolorem vitae doloribus nesciunt voluptatibus nulla. Harum, maxime! Fugiat sequi hic esse animi, molestiae consectetur cum, vero commodi magni optio saepe vitae id earum. Minus nemo omnis facere praesentium similique illo facilis temporibus repellat a iusto aspernatur nulla, officia itaque repudiandae laudantium rem voluptate esse blanditiis doloremque pariatur voluptas, porro inventore magni. <br/><br/>Perferendis animi nisi deserunt quidem magnam libero voluptate vitae expedita tempore, vero dolor architecto fugit facere eos nesciunt! Quos similique repellendus temporibus optio distinctio doloribus laudantium sunt quis possimus, a accusamus. Et ipsam nobis nisi molestias laborum suscipit possimus similique ipsum explicabo facere error, maxime alias eaque adipisci recusandae dolorem modi cumque repellat quasi dicta sed voluptatum minima labore. Laudantium corporis earum asperiores facilis architecto possimus aspernatur dolor autem, vel magnam necessitatibus rem laboriosam accusantium tempore quis! In expedita consequatur asperiores cupiditate voluptates voluptatem dignissimos cumque officia vero, natus, corrupti quam atque iusto, facere eaque esse quia fuga optio ipsa ad praesentium inventore distinctio. <br/><br/>Amet, facere dolore explicabo expedita quis voluptatum itaque mollitia molestias, animi nihil laborum consectetur odio aliquam.
          </p>
      </section> */}

      <section className="recentlyAdded">
        <h1 className="swiperName">ostatnio dodane przepisy:</h1>
        <div className="swiperContainer">
          {/* <Slider />
        <SliderFlex /> */}
          <SwiperContainer cards={obj} />
        </div>
      </section>
    </>
  );
}
