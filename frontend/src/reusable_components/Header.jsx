import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useRevalidator,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import NavBar from "../reusable_components/NavBar";
// import Others from "../../unwanted_reusable_components/Others";
import SubscribeButton from "../reusable_components/SubscribeButton";
// import Documentaries from "../components/Documentaries";
// import MoreDocumentaries from "../../unwanted_reusable_components/MoreDocumentaries";
import Footer from "../components/Footer";

const GENRE_LABELS = {
  "Science Fiction": "Sci-Fi",
  "Television Movie": "TV Movie",
};

export default function Header({ nowPlayingMovies, LoadersData }) {
  console.log("Headers LoadersData: ", LoadersData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!nowPlayingMovies.length) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === nowPlayingMovies.length - 1) {
          return 0;
        }

        return prevIndex + 1;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [nowPlayingMovies]);

  const randomMovie = nowPlayingMovies[index];
  //   useEffect(() => {
  //     if (revalidator === "idle") {
  //       revalidator.revalidate();
  //     }
  //   }, [genre, id]);

  // Programmatically Scroll to the top immediately this component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //converting the pathname in string format into an array

  const { vote_average, release_date, title } = randomMovie;
  //   console.log("TV Hero", hero.first_air_date);
  //   console.log("Tv List", tvList);

  let year_of_release = release_date.split("-")[0];
  //   let minutes = hero.runtime % 60;
  //   let hours = Math.trunc(hero.runtime / 60);
  //   let rating = hero["vote_average"].toFixed(1);

  // ! formatting the genre_ids
  //   const formattedGenres = hero.genres.map(
  //     (genre) => GENRE_LABELS[genre] ?? genre,
  //   );
  //   console.log("FormattedGenres: ", formattedGenres);

  //   const maturity_rating = hero["content_ratings"].results
  //     .map((result) => {
  //       return {
  //         iso_3166_1: result["iso_3166_1"],
  //         rating: result.rating,
  //       };
  //     })
  //     .filter((rating) => rating?.rating?.trim() !== "");

  //   console.log("Maturity Rating: ", maturity_rating);

  //   //* Making the Maturity rating array to contain objects with two key-value types certification and release_date
  //   const formattedRating = maturity_rating.map((rating) => {
  //     return {
  //       certification: rating["release_dates"][0].certification,
  //       release_date: rating["release_dates"][0].release_date,
  //     };
  //   });

  //* creating an array that contains only values of certification key for every rating in the formattedRating and using splice() to limit the number of elements that the final array will contain and using join(", ") to convert to a string and separating each string with a comma ",", when a uniqueArray is derived using Set() constructor
  //   const ratingArray = maturity_rating.map((rating) => rating.rating);
  //   const uniqueRating = [...new Set(ratingArray)];
  //   const finalRating = uniqueRating.splice(0, 5).join(", ");
  //   console.log("Final Rating: ", finalRating);

  //   //* creating an array that contains only values of certification key for every rating in the formattedRating and using splice() to limit the number of elements that the final array will contain and using join(", ") to convert to a string and separating each string with a comma ",", when a uniqueArray is derived using Set() constructor
  //   const releaseDateArray = formattedRating.map(
  //     (rating) => rating["release_date"],
  //   );
  //   const uniqueDate = [...new Set(releaseDateArray)];

  const [day, month, year] = release_date.split("-");

  const formattedReleaseDate = new Date(
    year,
    month - 1,
    day,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log("formattedReleaseDate", formattedReleaseDate);

  //   const createdBy = hero.created_by;
  //   const castsArray = hero.credits.cast.map((cast) => {
  //     return {
  //       id: cast.id,
  //       original_name: cast["original_name"],
  //       profile_path: cast["profile_path"],
  //       character: cast.character,
  //     };
  //   });

  //   const formattedCastsArray = castsArray.filter((cast) => {
  //     const character = cast?.character || "";
  //     const profilePath = cast?.profile_path;

  //     return (
  //       !character.toLowerCase().includes("(uncredited)") &&
  //       profilePath !== null &&
  //       profilePath !== ""
  //     );
  //   });

  //   console.log("castArray: ", formattedCastsArray);
  return (
    <header className="w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={randomMovie.id}
          className="relative w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/10 via-black/20 to-black/90" />

          {/* Background Image */}
          <motion.div
            className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path})`,
            }}
            initial={{
              scale: 1.1,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 9,
            }}
            exit={{
              scale: 1.05,
              opacity: 9,
            }}
            transition={{
              duration: 1.0,
              ease: "easeInOut",
            }}
          />

          {/* Hero Content */}
          <div className="absolute inset-0 z-30">
            <motion.div
              className="relative flex flex-col gap-9 top-[39%] left-[4%] w-[50%] py-[30px] text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
              }}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <motion.h1
                    className="text-white text-[60px] font-bold"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                  >
                    {title}
                  </motion.h1>

                  <motion.h3
                    className="flex items-center gap-2 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.6,
                    }}
                  >
                    <span className="text-2xl">⭐</span>

                    <span className="text-2xl">{Math.round(vote_average)}</span>

                    <span className="w-2 h-2 rounded-full bg-white" />

                    <span className="text-2xl">{year_of_release}</span>

                    <span className="w-2 h-2 rounded-full bg-white" />
                  </motion.h3>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                }}
              >
                <SubscribeButton
                  btnAction="Watch now"
                  className="hover:bg-white hover:text-blue-700"
                />

                <Link
                  to="/"
                  className="rounded-full bg-[#c5c1c16b] px-4 py-4 font-medium text-white hover:bg-blue-400"
                >
                  Watch Trailer
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
