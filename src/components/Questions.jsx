// import { useLoaderData } from "react-router-dom";

import { useState } from "react";

// NOTE: This Function Component is a Child Component to Main.jsx
export default function Questions({ Questions, isLoading = false }) {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const questionList = Array.isArray(Questions) ? Questions : [];

  function handleViewQuestion(index) {
    setActiveIndexes((prev) => {
      return prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
    });
  }

  console.log("QuestionPage Questions", questionList);

  return (
    <section className="flex flex-col justify-center items-center gap-8 sm:gap-11 w-full h-auto py-16 sm:py-24 md:py-[120px] px-4 sm:px-6">
      <div className="flex flex-col items-center w-full md:w-[70%] lg:w-[50%] gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl font-sans text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit aenean id
          volutpat imperdiet quis at pellentesque nunc commodo nunc purus
          pulvina.
        </p>
      </div>

      <ul className="flex flex-col gap-4 sm:gap-6 w-full md:w-[90%] lg:w-[80%]">
        {isLoading && questionList.length === 0 && (
          <li className="text-center text-gray-400">Loading questions...</li>
        )}
        {questionList.map((quest, index) => (
          <li key={quest.question}>
            <div className="flex flex-col py-6 sm:py-8 md:py-[43px] px-4 sm:px-6 md:px-[35px] gap-2 rounded-2xl border-1 border-[#6d6c6c] hover:scale-[0.99]">
              <div className="flex justify-between items-center ">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl font-sans pr-4">
                  {quest.question}
                </h3>
                <div
                  className="flex items-center shrink-0 justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-13 md:w-13 rounded-full bg-[#80808069]"
                  onClick={() => handleViewQuestion(index)}
                >
                  <svg
                    viewBox="0 0 256 256"
                    className="w-5 h-5 stroke-[white] stroke-[20]"
                  >
                    <path d="M220,128a4.0002,4.0002,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4.0002,4.0002,0,0,1,220,128Z"></path>
                  </svg>
                </div>
              </div>
              {activeIndexes.includes(index) && (
                <p>
                  {quest.answer} {activeIndexes}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
