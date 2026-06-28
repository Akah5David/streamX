import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SliderButton from "../reusable_components/SliderButton";
import Section from "../reusable_components/SubscribeButton";

export default function MovieGenres({ movieGenres, movieGenreRef }) {
  const sliderRef = useRef(null);

  // Guard against undefined data
  if (!movieGenres || movieGenres.length === 0) {
    return (
      <section ref={movieGenreRef} className="relative inset-0 my-0 bg-black">
        <div className="relative pl-[45px] pr-[15px] w-full py-[50px]">
          <h1 className="text-[2rem] font-bold text-white pb-[1.5rem]">
            Movie
          </h1>
          <p className="text-gray-400">No movies available</p>
        </div>
      </section>
    );
  }

  // ! I don't understand this function and what it does.
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
    <section ref={movieGenreRef} className="relative inset-0 py-4">
      <SliderButton handleNext={handleNext} handlePrev={handlePrev} />
        <h1 className="text-2xl sm:text-3xl font-bold text-white ml-2 sm:ml-4">
          Movies
        </h1>
        <ul
          ref={sliderRef}
          className="flex gap-3 sm:gap-4 md:gap-5 snap-x snap-mandatory py-2.5 scroll-smooth pl-2 sm:pl-4 select-none overflow-scroll no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {movieGenres.map((movie) => (
            <motion.li
              key={`${movie.id}`}
              className="flex-none w-[70%] sm:w-[45%] md:w-[30%] lg:w-[20%] xl:w-[15%] aspect-1/1.5 snap-center snap-always scroll-m-6 border-1 rounded-lg overflow-hidden hover:scale-105"
            >
              <Link
                to={`/movie/${movie.name.toLowerCase()}`}
                className=" w-full object-cover shadow-md relative  transition-transform duration-300 "
              >
                <img
                  src={`${movie.image}`}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 z-30 bg-gradient-to-b from-black/5 via-black/20 to-black/98 rounded-lg">
                  <div className="absolute bottom-1/6 left-[50%] translate-x-[-50%] z-40 text-white">
                    <h2 className="text-2xl/10 mb-3 font-stretch-condensed font-bold">
                      {movie.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
    </section>
  );
}
