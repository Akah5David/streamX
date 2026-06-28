import { useRef } from "react";
import { Link } from "react-router-dom";

import SliderButton from "../reusable_components/SliderButton";

export default function NowPlayingMovies({ nowPlayingMovies, nowPlayingRef }) {
  const sliderRef = useRef(null);

  // Guard against undefined data
  if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
    return (
      <section ref={nowPlayingRef} className="relative inset-0 my-0 bg-black">
        <div className="relative pl-[45px] pr-[15px] w-full py-[50px]">
          <h1 className="text-[2rem] font-bold text-white pb-[1.5rem]">
            Now Playing
          </h1>
          <p className="text-gray-400">No movies available</p>
        </div>
      </section>
    );
  }

  const SLIDE_AMOUNT = () => sliderRef.current.offsetWidth;

  const handleNext = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: SLIDE_AMOUNT(),
      behavior: "smooth",
    });
  };
  const handlePrev = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -SLIDE_AMOUNT(),
      behavior: "smooth",
    });
  };

  return (
    <section ref={nowPlayingRef} className="relative inset-0 py-4">
      <SliderButton handleNext={handleNext} handlePrev={handlePrev} />
        <h1 className="text-2xl sm:text-3xl font-bold text-white ml-2 sm:ml-4">
          Now Playing
        </h1>
        <div
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 md:gap-5 snap-x snap-mandatory scroll-smooth py-2 pl-2 sm:pl-4 select-none overflow-scroll no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {nowPlayingMovies.map((movie) => (
            <Link
              to={`/nowPlaying/${movie.id}`}
              key={`${movie.id}`}
              className="flex-none w-[70%] sm:w-[45%] md:w-[30%] lg:w-[20%] xl:w-[15%] aspect-1/1.5 snap-center snap-always scroll-m-6 border-1 rounded-lg overflow-hidden hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`movie.original_name`}
                className="object-cover w-full h-full"
              />
            </Link>
          ))}
        </div>
    </section>
  );
}
