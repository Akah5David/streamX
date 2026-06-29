import { useEffect, useState } from "react";
import { useOutletContext, useLoaderData} from "react-router-dom";
import ComponentLoaders from "../api/loader";

import Header from "../reusable_components/Header.jsx";
import NowPlayingMovies from "../components/NowPlayingMovies";
import PopularMovies from "../components/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import UpComingMovies from "../components/UpComingMovies";
import MovieGenres from "../components/MovieGenres";
import TvGenres from "../components/TvGenres";
import AvailablePage from "../components/Available";
import QuestionsPage from "../components/Questions";
import PlatformPage from "../components/Platform.jsx";
import FooterPage from "../components/Footer";
import SubscriptionPage from "../components/Subscription.jsx";

export default function MainPage() {
  const homePage = useOutletContext();
  // const LoadersData = useLoaderData();
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const sectionRefs = homePage.sectionRefs;

  console.log("movie HomePage Data: ", homePage);

  useEffect(() => {
    let isActive = true;

    const fetchQuestions = async () => {
      try {
        const data = await ComponentLoaders.questionLoader();
        if (isActive) {
          setQuestions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Questions fetch failed:", error);
        if (isActive) {
          setQuestions([]);
        }
      } finally {
        if (isActive) {
          setQuestionsLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      isActive = false;
    };
  }, []);

  const movieData = homePage.data.movie;
  const tvData = homePage.data.tv;

  return (
    <div className="w-full min-h-screen">
      <Header nowPlayingMovies={movieData.nowPlayingMovies}/>

      <NowPlayingMovies
        nowPlayingRef={sectionRefs.nowPlayingRef}
        nowPlayingMovies={movieData.nowPlayingMovies}
      />
      <PopularMovies
        popularRef={sectionRefs.popularRef}
        popularMovies={movieData.popularMovies}
      />
      <TopRatedMovies
        topRatedRef={sectionRefs.topRatedRef}
        topRatedMovies={movieData.topRatedMovies}
      />
      <UpComingMovies
        upComingRef={sectionRefs.upComingRef}
        upComingMovies={movieData.upComingMovies}
      />
      <MovieGenres
        movieGenreRef={sectionRefs.movieGenreRef}
        movieGenres={movieData.movieGenres}
      />
      <TvGenres
        tvGenreRef={sectionRefs.tvGenreRef}
        tvGenres={tvData.tvGenres}
      />
      {/* <DocumentariesPage categories={homePage} /> */}
      <SubscriptionPage />
      <AvailablePage />
      <hr className="border-0 bg-[#817d7d] h-[1px] mx-4 sm:mx-6 md:mx-10 lg:mx-[50px]" />
      <QuestionsPage Questions={questions} isLoading={questionsLoading} />
      <PlatformPage />
      <FooterPage />
    </div>
  );
}
