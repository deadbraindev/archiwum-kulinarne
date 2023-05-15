// export const metadata = {
//   title: 'przepis',
// };

export async function generateMetadata({ params }) {
  return {
    title: params.slug,
    openGraph: {
      title: params.slug,
      url: `https://archiwumkulinarne.deadbrain.dev/przepisy/${params.slug}`,
    },
  };
}

export default function Page({ params }) {
  const { slug } = params;
  return <div>{slug}</div>;
}
