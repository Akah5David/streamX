import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import MainPage from "./pages/Main";
import ComponentLoaders from "./api/loader";

import SubscribePage from "./pages/SubscribePage";
import DocumentariesPage from "./pages/DocumentariesPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import LogoutPage from "./pages/LogoutPage";
import FooterPage from "./pages/FooterPage";
import MoviesPage from "./pages/Movies";
import MovieDetailPage from "./pages/MovieDetail";
import NowPlayingPage from "./pages/NowPlaying";
import TopRatedPage from "./pages/TopRated";
import PopularPage from "./pages/Popular";
import UpComingPage from "./pages/UpComing";
import TvPage from "./pages/Tv";
import ScrollToTop from "./components/ScrollToTop";
import PremiumSubscribePage from "./pages/PremiumSub";
// import ViewVideoPage from "./pages/ViewVideoPage";
import LoadingFallback from "./pages/LoadingFallback";

// import { HomePage } from "./api/loader";

function App() {
  console.log("Component Loaders: ", ComponentLoaders)
  const { homePage, movies, tvGenres, nowPlaying, topRated, upComing, popular } =
    ComponentLoaders;



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      HydrateFallback: LoadingFallback,
      loader: homePage,
      children: [
        {
          index: true,
          element: <MainPage />,
          HydrateFallback: LoadingFallback,
          // loader: nowPlaying
        },
      ],
    },
    {
      path: "/movie/:genre",
      element: <MoviesPage />,
      loader: movies,
      HydrateFallback: LoadingFallback,
      children: [
        {
          path: ":id",
          element: <MoviesPage />,
          loader: movies,
          HydrateFallback: LoadingFallback,
        },
      ],
    },
    {
      path: "/tv/:genre",
      element: <TvPage />,
      loader: tvGenres,
      HydrateFallback: LoadingFallback,
      children: [
        {
          path: ":id",
          element: <TvPage />,
          loader: tvGenres,
          HydrateFallback: LoadingFallback,
        },
      ],
    },
    {
      path: "/nowPlaying/:id",
      element: <NowPlayingPage />,
      loader: nowPlaying,
      HydrateFallback: LoadingFallback,
    },
    {
      path: "/top_rated/:id",
      element: <TopRatedPage />,
      loader: topRated,
      HydrateFallback: LoadingFallback,
    },
    {
      path: "/upcoming/:id",
      element: <UpComingPage />,
      loader: upComing,
      HydrateFallback: LoadingFallback,
    },
    {
      path: "/popular/:id",
      element: <PopularPage />,
      loader: popular,
      HydrateFallback: LoadingFallback,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Root />,
//       loader: RootLoader,
//       children: [
//         {
//           index: true,
//           element: <MainPage />,
//           HydrateFallback: LoadingFallback,
//         },
//       ],
//     },
//     { path: "/category", element: <CategoriesPage />, loader: CategoryLoader },
//     {
//       path: "/documentaries",
//       element: <DocumentariesPage />,
//     },

//     { path: "pages", element: <FooterPage /> },
//     { path: "/cart", element: <CartPage /> },
//     { path: "/auth/:type", element: <AuthPage /> },
//     { path: "/logout", element: <LogoutPage /> },
//     {
//       path: "/subscribe",
//       element: <SubscribePage />,
//       loader: RootLoader,
//     },
//     {
//       path: "/subscribe/premium",
//       element: <PremiumSubscribePage />,
//       loader: RootLoader,
//     },
//     {
//       path: "/popular/:name",
//       element: <ViewVideoPage />,
//       loader: RootLoader,
//     },
//     {
//       path: "/latest/:name",
//       element: <ViewVideoPage />,
//       loader: RootLoader,
//     },
//     {
//       path: "/category/:name",
//       element: <ViewVideoPage />,
//       loader: RootLoader,
//     },
//   ]);
