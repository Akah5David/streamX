import { useEffect, useRef, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import ComponentLoaders from "../api/loader";
import Navbar from "../reusable_components/NavBar";

import Header from "../components/HomeHeader";
import ScrollToTop from "../components/ScrollToTop";
// import FooterPage from "../components/Footer";

// const defaultHomeData = {
//       data: {
//         movie: {
//           movieGenres: [],
//           popularMovies: [],
//           topRatedMovies: [],
//           upComingMovies: [],
//           nowPlayingMovies: [],
//           trendingMovies: [],
//         },
//         tv: {
//           tvGenres: [],
//           tvSeries: {
//             airingTodayTv: [],
//             onTheAirTv: [],
//             popularTv: [],
//             topRatedTv: [],
//             trendingTvShows: [],
//           },
//         },
//         trending: {
//           trendingMovies: [],
//           trendingTvShows: [],
//         },
//       },
//       error: error.message,
//     };

export default function Root() {
  const homePage = useLoaderData();
  const [homePageData, setHomePageData] = useState(homePage);
  

  useEffect(() => {
    setHomePageData(homePage);
  }, [homePage]);

    console.log("homePageData: ", homePageData);

  const sectionRefs = {
    popularRef: useRef(null),
    topRatedRef: useRef(null),
    upComingRef: useRef(null),
    tvGenreRef: useRef(null),
    movieGenreRef: useRef(null),
    nowPlayingRef: useRef(null),
  };

  const scrollToPopular = () => {
    const rect = sectionRefs.popularRef.current.getBoundingClientRect();
    console.log(
      "The Position of PopularMovie section with respect to viewport: ",
      rect.top,
    );
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };

  const scrollToTopRated = () => {
    const rect = sectionRefs.topRatedRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };
  const scrollToNowPlaying = () => {
    const rect = sectionRefs.nowPlayingRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };
  const scrollToMovies = () => {
    const rect = sectionRefs.movieGenreRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };
  const scrollToTv = () => {
    const rect = sectionRefs.tvGenreRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };
  const scrollToUpComing = () => {
    const rect = sectionRefs.upComingRef.current.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top - 80,
      behavior: "smooth",
    });
  };

  const scrollToSections = {
    scrollToTopRated,
    scrollToPopular,
    scrollToNowPlaying,
    scrollToUpComing,
    scrollToMovies,
    scrollToTv,
  };


  return (
    <>
      <ScrollToTop />
      <Navbar LoadersData={homePageData} scrollToSections={scrollToSections} />
      {/* <Header LoadersData={homePageData} scrollToSections={scrollToSections} /> */}
      <main>
        <Outlet context={{ ...homePageData, sectionRefs, scrollToSections}} />
      </main>
      {/* <FooterPage /> */}
    </>
  );
}
