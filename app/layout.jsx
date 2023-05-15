// import Link from 'next/link';
import ReactQueryWrapper from './ReactQueryWrapper';
import Navbar from '../components/Navbar';
// import styles from './styles/Homepage.module.css';
import './styles/globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'archiwum kulinarne',
    template: '%s | archiwum kulinarne',
  },
  description: 'Zdigitalizowane rodzinne przepisy kuchenne',
  openGraph: {
    title: 'archiwum kulinarne',
    url: 'https://archiwumkulinarne.deadbrain.dev/',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/fife/AAbDypAgikCPH-16M3M0FGR7B4qCpS36COFuIr9NJM7l8KzeI_lrXprt6qPiOsv4LUdhnlYu0B-KEyzSJ9m2xkaH6TjBLB86S4yXflc52WnwCwLOUr6LE9f5b7BsWWx8m5f2Luq87Dsn1O5SSZkVTdVZq-EyVU_AZ-gAlWh28sch5tYQgXIROlUhJPuVKx_pNLrUif-ZSWyFX8O4EFAhZ0xDUMbwtiHJ6A8gRT5QrexSmZib-oEA2wbs1i11T-f-CeNNO-5BBPDBqJe2YofdQE_Q8tMS_wdCUDzo8D_vMSzG8r-DwgyLkQ4pGKL-wuUJc3aKWzu7BmZNcFvM7uQg_WfcL8f9P01CDUHg--QEx8hZizOoqIsIv4uAgdFDPZVpHCQiTsAvJTdJ9WUEDsnHXFvx6xSG06c2UsLaUDhJFniHVSazamQnslr4An-oINZdYXDW-lmCStMBmVv9cboxJ0ZnFwUHfSDcDVKGPLJsKM8eoeMKs2e1_RhkKhesxkoX0puqDMIc-dGTw2oU4fuVo86KphJuMkM2so8Lfm9fXvDfYTrbpvKYB2NFTz2vJvxR6RDiEv18rFbdQSrEBg_b5TCW9aQoePLc5KOw_rMfApuPgc9GR8h_HVXWhRr2a54IwTnM410ndI5Q3BMY6xdx9xpaMa0WYm1l3Mxjuy7j5C4b17HKUdfA6q76v08WZum3gHmwvuglhkH-fvqHfxkH1ICtQzfqI7z_pi3b7z5LbmzMMGmdkHs6O7IqyCq9yTGa_MY24VZWPbH0SepH_jQ3meg49K9urCgxE7WP6mRY8UyKo2T-OonIjR0ZF_dE42YhvjRmhvkp2ZKgFAPVQtEWr1D34rYAM3YmZEyUig7umFma0bG73Jb-xPc-iufdDP-Zv4eqN8QE4E9HuYhmnuM2qFLTiRuF0IPNwPcvwq6vnVjuhNlEe0wvmDA_go1nTAD0e-8bCXaOPO37BPnDdt-_y0igpCKgE2x80diedkYnuxCLmCumxVBTRb0VoaglmimHM2klLnxFz99r_EhknhVsp9agibzr65rd31QsUhFbOqYKI7jZqR4EHXB2DB_NnMTQ9CNV0AKTdL7A6aUfRBAbtgG4LKMTwQp-iAj8sPXQrxccmq4zGIGnULgWtaOWg4TNto7_uViOTlL9NgMkx19nX21aEhh5wJO8uaEhs294IYlHaiODzyZ9o33GbvJNh5sywix0XnlDHZ2HXHtK2A4Q2uZJPGtrn4O2BG7AD-z3ze4xpBgfhp1CK84LIy-o1opZMhl4IrCLyDjSusLwH9zpYnA4axOXWX0QlEPEka42s5zwqVs=w5324-h2736',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <div className="content">
          <Navbar />
          <div className="container">
            <ReactQueryWrapper>{children}</ReactQueryWrapper>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
