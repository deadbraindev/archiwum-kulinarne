import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useLocalStorage from 'use-local-storage'




function SharedLayout() {
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  // useEffect(() => {
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  
  //   if (prefersDark) {
  //     setTheme("dark");
  //   }
  // }, []);

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // }
  // console.log(theme.toString());
  // document.querySelector("body").setAttribute("data-theme", `${theme}`)

  return (
    <div className="content">
      <Navbar />
      {/* <button onClick={switchTheme}>zmien theme</button> */}
      <section className="container">
        <Outlet />
      </section>
      {/* <button onClick={switchTheme}>zmien theme</button> */}

      <Footer />
    </div>
  );
}

export default SharedLayout;
