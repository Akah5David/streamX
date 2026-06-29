import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import logoImg from "../assets/svgs/logo.svg";
import profileImg from "../assets/svgs/profile.svg";

import ModalFooter from "./ModalFooter";
import MovieCategories from "../components/MovieCategories";
import ToggableMenu from "./ToggableMenu";
import NowPlayingMovies from "../components/NowPlayingMovies";
import PopularMovies from "../components/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import UpComingMovies from "../components/UpComingMovies";
import MovieGenres from "../components/MovieGenres";
import TvGenres from "../components/TvGenres";
import CartModal from "../pages/CartPage";

export default function Navbar({ LoadersData, scrollToSections }) {
  console.log("Subscribe LoadersData", LoadersData);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const [openMovieMenu, setOpenMovieMenu] = useState(false);
  const [openTVMenu, setOpenTVMenu] = useState(false);
  const [toggleCartModal, setToggleCartModal] = useState(false);

  const pageMenuCloseTimeout = useRef(null);
  const closeMovieMenuTimeout = useRef(null);
  const tvMenuCloseTimeout = useRef(null);
  const cartModalRef = useRef(null);

  //A function that opens the modal when the cart button is pressed
  function openCartModal() {
    cartModalRef.current?.open();
    setToggleCartModal(true);
  }

  //Functions that cancels the current reading time of set setTimeout when the mouse is place on the button and set the MenuOpen state to true causing the menu to appear
  function handlePageMenuOpen() {
    if (pageMenuCloseTimeout.current) {
      clearTimeout(pageMenuCloseTimeout.current);
    }
    setPageMenuOpen(true);
  }

  function handlePageMenuClose() {
    pageMenuCloseTimeout.current = setTimeout(() => {
      setPageMenuOpen(false);
    }, 200);
  }

  //! David Make sure you study this part
  function openMovieMenuFn() {
    if (closeMovieMenuTimeout.current) {
      clearTimeout(closeMovieMenuTimeout.current);
    }
    setOpenMovieMenu(true);
  }

  function closeMovieMenuFn() {
    closeMovieMenuTimeout.current = setTimeout(() => {
      setOpenMovieMenu(false);
    }, 200);
  }

  function openTVMenuFn() {
    if (tvMenuCloseTimeout.current) {
      clearTimeout(tvMenuCloseTimeout.current);
    }
    setOpenTVMenu(true);
  }

  function closeTVMenuFn() {
    tvMenuCloseTimeout.current = setTimeout(() => {
      setOpenTVMenu(false);
    }, 200);
  }

  //This function calls the close() method of the Modal element when a close button is pressed or when we press escape on the keyboard
  function closeCartModal() {
    setToggleCartModal(false);
    cartModalRef.current?.close();
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  // ! calculating the offsetTop of each of the sections
  // function calculateOffSet() {
  //   const rect = popularRef.current.getBoundingClientRect();
  //   console.log("rect Top" + rect.top);
  //   console.log("popularRef.current :" + popularRef.current);
  //   console.log("scrollY" + window.scrollY);
  //   window.scrollTo({
  //     top: window.scrollY + rect.top - 80,
  //     behavior: "smooth",
  //   });
  // }

  console.log("NavBar LoadersData: ", LoadersData);
  //Destructed LoadersData to get explore and categories props
  const { movie, tv } = LoadersData.data;
  const { movieGenres, ...exploreMovies } = movie;
  const { tvGenres, tvSeries } = tv;
  const formattedTvSeries = {
    AiringToday: tvSeries.airingTodayTv,
    OnTheAir: tvSeries.onTheAirTv,
    PopularTvShows: tvSeries.popularTv,
    TopRatedTvShows: tvSeries.topRatedTv,
    trendingTvShows: tvSeries.trendingTvShows,
  };
  return (
    <>
      <header className="fixed top-0 inset-x-0 w-full z-[9999] bg-[#140e14]/30 text-white">
        <div className="mx-auto w-full max-w-[1200px] flex items-center gap-3 lg:gap-10 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 md:px-8">
          <div className="flex gap-2 items-center min-w-max">
            <img
              src={logoImg}
              alt="Logo"
              className="h-10 w-5 sm:h-12 sm:w-6 md:h-[60px] md:w-[30px]"
            />
            <h3 className="text-white font-bold font-serif text-lg sm:text-xl md:text-[25px]">
              Streaming X
            </h3>
            {/* <h3>{windowPosition}</h3> */}
          </div>
          <nav className="flex-1">
            <ul className="hidden lg:flex justify-end items-center gap-4 xl:gap-5 min-w-0">
              <li className="hover:text-[grey]">
                <Link to="/">Home</Link>
              </li>

              <li
                onMouseEnter={openMovieMenuFn}
                onMouseLeave={closeMovieMenuFn}
                className="flex items-center gap-2 hover:hover:text-[#ffffff34]"
              >
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSections.scrollToMovies();
                  }}
                >
                  Movies
                </Link>
                <svg
                  fill="currentColor"
                  viewBox="0 0 30.727 30.727"
                  className="w-[11px] h-[12px] font-serif"
                >
                  <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"></path>{" "}
                </svg>
              </li>
              <li
                onMouseEnter={openTVMenuFn}
                onMouseLeave={closeTVMenuFn}
                className="flex items-center gap-2 hover:hover:text-[#ffffff34]"
              >
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSections.scrollToTv();
                  }}
                >
                  Tv
                </Link>
                <svg
                  fill="currentColor"
                  viewBox="0 0 30.727 30.727"
                  className="w-[11px] h-[12px] font-serif"
                >
                  <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"></path>{" "}
                </svg>
              </li>
              <li
                onMouseEnter={handlePageMenuOpen}
                onMouseLeave={handlePageMenuClose}
                className="relative hover:text-[#ffffff34]"
              >
                <div className="flex items-center gap-2">
                  <Link to="/">Pages</Link>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 30.727 30.727"
                    className="w-[11px] h-[12px] font-serif"
                  >
                    <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"></path>
                  </svg>
                </div>
              </li>

              <li>
                <button className="cursor-pointer" onClick={openCartModal}>
                  Cart
                </button>
              </li>
              <li>
                <Link to="/auth/login">
                  <div className="rounded-[50%] bg-[#c5c1c16b] h-[40px] w-[40px] relative">
                    <img
                      src={profileImg}
                      alt="profile"
                      className="w-[20px] h-[25px] font-serif absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  "
                    />
                  </div>
                </Link>
              </li>

              <li>
                <Link to="/" className="bg-[#c5c1c16b] py-2 px-4 rounded-full">
                  Log Out
                </Link>
              </li>
              <li>
                <Link
                  to="/subscribe"
                  className="bg-[#19a3ff] py-2 px-3 sm:px-4 rounded-full font-medium text-white text-sm sm:text-base"
                >
                  Subscribe
                </Link>
              </li>
            </ul>

            <div className="flex lg:hidden justify-end items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openCartModal}
                className="px-3 py-2 rounded-full bg-[#c5c1c16b] text-sm"
              >
                Cart
              </button>
              <Link
                to="/auth/login"
                className="rounded-full bg-[#c5c1c16b] h-10 w-10 relative"
                onClick={closeMobileMenu}
              >
                <img
                  src={profileImg}
                  alt="profile"
                  className="w-[20px] h-[25px] font-serif absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]"
                />
              </Link>
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="h-10 w-10 rounded-full bg-[#19a3ff] flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed top-[64px] sm:top-[72px] inset-x-4 sm:inset-x-6 z-[101] lg:hidden rounded-2xl bg-[#1f161f] border border-white/10 p-4 shadow-xl">
          <ul className="flex flex-col gap-3 text-sm sm:text-base">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSections.scrollToMovies();
                  closeMobileMenu();
                }}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSections.scrollToTv();
                  closeMobileMenu();
                }}
              >
                Tv
              </Link>
            </li>
            <li>
              <Link to="/subscribe" onClick={closeMobileMenu}>
                Subscribe
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
      {pageMenuOpen && (
        <div
          onMouseEnter={handlePageMenuOpen}
          onMouseLeave={handlePageMenuClose}
          className="fixed top-[80px] mt-4 left-1/2 -translate-x-1/2 z-50 bg-black opacity-90 w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] rounded-md shadow-lg"
        >
          <ModalFooter />
        </div>
      )}
      {openMovieMenu && (
        <div
          onMouseEnter={openMovieMenuFn}
          onMouseLeave={closeMovieMenuFn}
          className="grid grid-cols-3 grid-rows-1 text-black fixed top-[95px] left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] lg:w-[40%] z-100 opacity-95 overflow-hidden rounded-2xl bg-[#ffffff]"
        >
          <ToggableMenu
            categories={movieGenres}
            explore={exploreMovies}
            type="movie"
          />
        </div>
      )}
      {openTVMenu && (
        <div
          onMouseEnter={openTVMenuFn}
          onMouseLeave={closeTVMenuFn}
          className="grid grid-cols-3 grid-rows-1 text-black fixed top-[95px] left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] lg:w-[40%] z-100 opacity-95 overflow-hidden rounded-2xl bg-[#ffffff]"
        >
          <ToggableMenu
            categories={tvGenres}
            explore={formattedTvSeries}
            type="tv"
          />
        </div>
      )}

      {toggleCartModal && (
        <CartModal ref={cartModalRef} closeModalFn={closeCartModal} />
      )}
    </>
  );
}
