import { homePageStepsData } from "../../data";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";

function Steps() {
  return (
    <div className="container mx-auto pt-2 pb-5 px-3 sm:p-5 text-center">
      <h1 className="text-3xl font-bold">Steps</h1>
      <p className="text-base sm:text-xl">
        Here are the steps you need to complete in order to do a successful
        auction on Cricktrade.
      </p>
      <br />
      <div>
        {homePageStepsData.map((data) => {
          return (
            <div key={data.id} className="mb-4">
              <span className="h-12 w-12 inline-block mb-2 items-center content-center text-lg font-medium text-white bg-blue-400 rounded-full">
                {data.id}
              </span>
              <h2 className="text-lg font-medium">{data.title}</h2>
              <p>{data.desc}</p>
              {data.icon && (
                <LiaLongArrowAltDownSolid
                  size={36}
                  className="text-blue-500 mx-auto mt-1"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Steps;
