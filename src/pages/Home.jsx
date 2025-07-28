import { useState } from "react";
import bannerImg from "../assets/home_banner.jpg";
import GoogleOAuthWrapper from "../auth/GoogleOAuthWrapper";
import Features from "../components/home/Features";
import Steps from "../components/home/Steps";

function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="relative w-full h-[55vh] md:h-[65vh]">
        <img
          src={bannerImg}
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <p className="text-black text-3xl md:text-[38px] font-bold mb-4">
            Best player auction software for cricket game,
          </p>
          <p className="text-black text-lg md:text-[32px] font-semibold mb-6">
            100+ Auctions completed in 18 different countries. Register now.
          </p>
          <button
            className="bg-blue-500 text-white font-medium px-6 py-1.5 md:py-2 text-xl rounded hover:bg-blue-700 transition flex gap-1 items-center"
            onClick={() => setOpenModal(true)}
          >
            Sign In / Register
          </button>
        </div>

        {openModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setOpenModal(false)}
          >
            <div className="bg-white rounded-lg max-w-md relative p-5">
              <GoogleOAuthWrapper setOpenModal={setOpenModal} />
              <div className="text-end mt-5">
                <button
                  onClick={() => setOpenModal(false)}
                  className="bg-purple-400 hover:bg-purple-600 transition-all duration-200 py-1.5 px-4 rounded text-sm text-white font-medium w-fit"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <Features />
      <br />
      <Steps />
    </div>
  );
}

export default Home;
