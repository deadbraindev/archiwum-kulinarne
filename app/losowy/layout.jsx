export const metadata = {
  title: 'losowy przepis | archiwum kulinarne',
  openGraph: {
    title: 'losowy przepis | archiwum kulinarne',
    url: '/losowy',
    images: [
      {
        url: 'https://archiwumkulinarne.deadbrain.dev/images/opengraph-img-1200-630.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return <div>{children}</div>;
}
