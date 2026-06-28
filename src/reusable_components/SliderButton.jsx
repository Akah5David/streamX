import leftArrow from "../assets/svgs/left-arrow.png";
import rightArrow from "../assets/svgs/right-arrow.png";

export default function SliderButton({ handleNext, handlePrev }) {
  return (
    <div className="absolute left-0 right-0 px-2 sm:px-2 md:px-2  lg:w-[100%] flex justify-between top-1/2 -translate-y-1/4 z-60 pointer-events-none">
      <button
        onClick={handlePrev}
        className="pointer-events-auto rounded-full bg-white/40 p-2 sm:p-3 hover:bg-white/60 transition"
      >
        <img
          src={leftArrow}
          alt=" absolute left arrow"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
      </button>
      <button
        onClick={handleNext}
        className="pointer-events-auto bg-white/40 p-2 sm:p-3 hover:bg-white/60 transition rounded-full"
      >
        <img
          src={rightArrow}
          alt=" absolute left arrow"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
      </button>
    </div>
  );
}
