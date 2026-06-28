import { Link } from "react-router-dom";

import NavBar from "../reusable_components/NavBar";
import SubscribeButton from "../reusable_components/SubscribeButton";

export default function Header({ HomePageData, scrollToSections }) {
  console.log("HomeHeader LoadersData", HomePageData);

  return (
    <header>
      <div className="relative w-full min-h-screen bg-orange-700 overflow-hidden">
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/70 via-black/5 to-black/"></div>
        <div className="bg-[url(/images/background.jpeg)] bg-no-repeat bg-center bg-cover inset-0 absolute z-10 bg-local"></div>
        <div className="absolute z-30 inset-0">
          {/* <NavBar
            LoadersData={HomePageData}
            scrollToSections={scrollToSections}
          /> */}
          <div className="relative mx-auto w-full max-w-[1200px] h-full px-4 sm:px-6 md:px-8">
            <div className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-8 w-full md:max-w-[70%] lg:max-w-[55%] text-left">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold leading-tight max-w-[20ch]">
                Unlimited Animals documentaries in 4k
              </h1>
              <p className="text-white text-base sm:text-lg md:text-xl mt-3 max-w-[58ch]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit massa a
                netus elit cursus eget viverra vitae risus nunc facilisis feugiat.
              </p>
              <div className="w-full mt-6 sm:mt-8 md:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
                <SubscribeButton btnAction="Subscribe today!" />
                <Link
                  to="/"
                  className="bg-[#c5c1c16b] py-3 sm:py-4 px-4 rounded-full font-medium text-white"
                >
                  Explore documentaries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
