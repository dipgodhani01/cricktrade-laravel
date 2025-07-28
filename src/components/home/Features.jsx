import { LuMessageSquare } from "react-icons/lu";
import { BsPersonCircle } from "react-icons/bs";

function Features() {
  return (
    <div className="p-5 mb-4 container mx-auto text-center">
      <h2 className="text-3xl font-bold">Advanced Features</h2>
      <div className="p-4 mt-4 grid md:grid-cols-2 grid-cols-1 gap-12">
        <div>
          <span className="text-blue-400">
            <BsPersonCircle size={78} className="mx-auto" />
          </span>
          <h4 className="text-xl font-medium mt-2">
            Online Player Registration
          </h4>
          <p className="text-lg">
            Players can register themselves for auction from anywhere using a
            registration form link.
          </p>
        </div>
        <div>
          <span className="text-blue-400">
            <LuMessageSquare size={78} className="mx-auto" />
          </span>
          <h4 className="text-xl font-medium mt-2">Customer support</h4>
          <p className="text-lg">
            You can contact us anytime using the email and mobile number
            mentioned below.
          </p>
        </div>
      </div>
      <br />
      <div className="sm:p-4 p-2 mt-4 mb-4 text-start">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          What is Cricktrade?
        </h1>
        <p className="text-base sm:text-lg text-gray-800">
          Cricktrade is an online player auction software that helps tournament
          organizers to conduct auction of players with multiple sports options
          available like cricket, football, volleyball, kabaddi etc. We also
          provide live streaming overlay and real-time updates.
        </p>
        <p className="mt-2 text-base sm:text-lg text-gray-800">
          For Tournament Organizers, maintaining excel sheets for each and every
          task becomes really tedious and that is where Cricktrade comes in
          where everything is automated and you can download data anytime you
          want. Cricktrade also helps you get more sponsors for your tournament
          as you can advertize your sponsors on the auction screen.
        </p>
      </div>
    </div>
  );
}

export default Features;
